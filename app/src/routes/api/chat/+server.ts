import Anthropic from '@anthropic-ai/sdk';
import { dev } from '$app/env';
import { ANTHROPIC_API_KEY, CHAT_MODEL } from '$app/env/private';
import { json } from '@sveltejs/kit';
import { MAX_CHARS, MAX_MESSAGES, type ChatMessage } from '#lib/chat/limits.ts';
import { redactPersonalData } from '#lib/server/chat/redact.ts';
import { takeSlot } from '#lib/server/chat/rate-limit.ts';
import { SYSTEM_BLOCKS } from '#lib/server/chat/knowledge.ts';
import type { RequestHandler } from './$types';

const DEFAULT_MODEL = 'claude-haiku-5-5';
const MAX_TOKENS = 800;
const MAX_TOKENS_WITH_THINKING = 1600;
const FALLBACK_BETA = 'server-side-fallback-2026-07-01';
const MAX_BODY_CHARS = 40_000;
const NO_STORE = { 'Cache-Control': 'no-store' };

let client: Anthropic | undefined;

function fail(message: string, status: number, headers: Record<string, string> = {}) {
	return json({ message }, { status, headers: { ...NO_STORE, ...headers } });
}

function parseMessages(raw: unknown): ChatMessage[] | null {
	if (typeof raw !== 'object' || raw === null) return null;
	const list = (raw as { messages?: unknown }).messages;
	if (!Array.isArray(list) || list.length === 0 || list.length > MAX_MESSAGES) return null;
	const messages: ChatMessage[] = [];
	for (const item of list) {
		if (typeof item !== 'object' || item === null) return null;
		const { role, content } = item as { role?: unknown; content?: unknown };
		if (role !== 'user' && role !== 'assistant') return null;
		if (typeof content !== 'string' || content.trim() === '' || content.length > MAX_CHARS) return null;
		messages.push({ role, content });
	}
	if (messages[0]?.role !== 'user' || messages[messages.length - 1]?.role !== 'user') return null;
	return messages;
}

const USAGE_KEYS = ['input_tokens', 'output_tokens', 'cache_creation_input_tokens', 'cache_read_input_tokens'];

function pickUsage(raw: Record<string, unknown>): Record<string, number> {
	const picked: Record<string, number> = {};
	for (const key of USAGE_KEYS) {
		const value = raw[key];
		if (typeof value === 'number') picked[key] = value;
	}
	return picked;
}

function startStream(anthropic: Anthropic, model: string, messages: ChatMessage[]) {
	const common = {
		model,
		system: SYSTEM_BLOCKS,
		output_config: { effort: 'low' as const },
		messages: messages.map((item) => ({ role: item.role, content: redactPersonalData(item.content) }))
	};
	if (model.includes('haiku')) {
		return anthropic.beta.messages.stream({
			...common,
			max_tokens: MAX_TOKENS,
			thinking: { type: 'disabled' }
		});
	}
	return anthropic.beta.messages.stream({
		...common,
		max_tokens: MAX_TOKENS_WITH_THINKING,
		betas: [FALLBACK_BETA],
		fallbacks: 'default'
	});
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const slot = takeSlot(getClientAddress());
	if (!slot.allowed) {
		return fail('Estás enviando muchas preguntas seguidas. Espera un momento e inténtalo de nuevo.', 429, {
			'Retry-After': String(slot.retryAfter)
		});
	}

	if (!ANTHROPIC_API_KEY) {
		return fail('El chat no está disponible por ahora. Puedes seguir usando el resto del sitio.', 503);
	}

	if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
		return fail('La solicitud no tiene un formato válido.', 415);
	}

	let payload: unknown;
	try {
		const text = await request.text();
		if (text.length > MAX_BODY_CHARS) return fail('La conversación es demasiado larga.', 413);
		payload = JSON.parse(text);
	} catch {
		return fail('La solicitud no tiene un formato válido.', 400);
	}

	const messages = parseMessages(payload);
	if (!messages) {
		return fail(
			`La conversación no es válida: máximo ${MAX_MESSAGES} mensajes de hasta ${MAX_CHARS.toLocaleString('es-MX')} caracteres.`,
			400
		);
	}

	client ??= new Anthropic({ apiKey: ANTHROPIC_API_KEY, maxRetries: 1, timeout: 30_000 });

	const model = CHAT_MODEL ?? DEFAULT_MODEL;
	const upstream = startStream(client, model, messages);
	const usage: Record<string, number> = {};
	let stopReason: string | null = null;

	function observe(event: { type: string }): void {
		if (event.type === 'message_start') {
			Object.assign(usage, pickUsage((event as unknown as { message: { usage: Record<string, unknown> } }).message.usage));
		} else if (event.type === 'message_delta') {
			const delta = event as unknown as { delta: { stop_reason?: string | null }; usage: Record<string, unknown> };
			stopReason = delta.delta.stop_reason ?? stopReason;
			Object.assign(usage, pickUsage(delta.usage));
		}
	}

	const encoder = new TextEncoder();
	const events = upstream[Symbol.asyncIterator]();
	let firstText: string | null = null;

	try {
		while (firstText === null) {
			const next = await events.next();
			if (next.done) break;
			const event = next.value;
			observe(event);
			if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
				firstText = event.delta.text;
			}
		}
	} catch (error) {
		upstream.abort();
		if (error instanceof Anthropic.RateLimitError) {
			return fail('El chat tiene mucha demanda en este momento. Inténtalo de nuevo en unos minutos.', 503);
		}
		return fail('No pudimos responder por ahora. Inténtalo de nuevo en unos minutos.', 502);
	}

	if (firstText === null) {
		if (stopReason === 'refusal') {
			return fail('Con esa pregunta no puedo ayudarte. Prueba con otra sobre las clínicas o llama a la unidad.', 422);
		}
		return fail('No pude responder esa pregunta. Prueba con otra o llama a la clínica.', 502);
	}

	const body = new ReadableStream<Uint8Array>({
		async start(controller) {
			controller.enqueue(encoder.encode(firstText));
			try {
				for (;;) {
					const next = await events.next();
					if (next.done) break;
					const event = next.value;
					observe(event);
					if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
						controller.enqueue(encoder.encode(event.delta.text));
					}
				}
				if (dev) console.info('[chat-usage]', JSON.stringify({ model, stopReason, ...usage }));
				controller.close();
			} catch (error) {
				controller.error(error);
			}
		},
		cancel() {
			upstream.abort();
		}
	});

	return new Response(body, {
		headers: {
			...NO_STORE,
			'Content-Type': 'text/plain; charset=utf-8',
			'X-Accel-Buffering': 'no'
		}
	});
};
