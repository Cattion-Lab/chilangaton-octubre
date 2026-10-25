import { consent } from '#lib/privacy/consent.svelte.ts';
import { MAX_CHARS, MAX_MESSAGES, type ChatMessage } from './limits.ts';

const GENERIC_ERROR = 'No pudimos responder por ahora. Inténtalo de nuevo en unos minutos.';

function buildHistory(messages: ChatMessage[]): ChatMessage[] {
	const recent = messages
		.slice(-MAX_MESSAGES)
		.map((item) => ({ role: item.role, content: item.content.slice(0, MAX_CHARS) }));
	const firstUser = recent.findIndex((item) => item.role === 'user');
	return firstUser === -1 ? [] : recent.slice(firstUser);
}

async function readError(response: Response): Promise<string> {
	try {
		const body = (await response.json()) as { message?: unknown };
		if (typeof body.message === 'string' && body.message !== '') return body.message;
	} catch {}
	return GENERIC_ERROR;
}

class ChatSession {
	messages = $state<ChatMessage[]>([]);
	draft = $state('');
	pending = $state(false);
	error = $state<string | null>(null);
	open = $state(false);

	async send(text: string): Promise<void> {
		const content = text.trim().slice(0, MAX_CHARS);
		if (!consent.accepted || this.pending || content === '') return;

		this.error = null;
		this.pending = true;
		this.draft = '';
		const history = buildHistory([...this.messages, { role: 'user', content }]);
		this.messages.push({ role: 'user', content }, { role: 'assistant', content: '' });
		const reply = this.messages.length - 1;

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: history })
			});
			if (!response.ok || !response.body) throw new Error(await readError(response));

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			for (;;) {
				const { done, value } = await reader.read();
				if (done) break;
				const target = this.messages[reply];
				if (target) target.content += decoder.decode(value, { stream: true });
			}
		} catch (error) {
			const partial = this.messages[reply]?.content ?? '';
			if (partial === '') {
				this.messages.splice(reply - 1, 2);
				this.draft = content;
			}
			this.error = error instanceof Error && error.message !== '' && !(error instanceof TypeError)
				? error.message
				: GENERIC_ERROR;
		} finally {
			this.pending = false;
		}
	}
}

export const chat = new ChatSession();
