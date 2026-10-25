<script lang="ts">
	import { tick } from 'svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import ChoiceGroup from '#lib/components/consult/ChoiceGroup.svelte';
	import { acceptConsent } from '#lib/components/consult/consent-actions.ts';
	import Message from '#lib/components/chat/Message.svelte';
	import { chat } from '#lib/chat/session.svelte.ts';
	import { MAX_CHARS } from '#lib/chat/limits.ts';
	import { consent } from '#lib/privacy/consent.svelte.ts';

	const EXAMPLES = [
		'¿Qué documentos necesito llevar?',
		'¿Qué clínicas abren en fin de semana?',
		'¿Cómo calculo un trayecto?'
	];

	let { id, panel = false }: { id: string; panel?: boolean } = $props();

	let log = $state<HTMLElement>();
	let end = $state<HTMLElement>();
	let field = $state<HTMLTextAreaElement>();
	let accept = $state<HTMLButtonElement>();

	const waiting = $derived(chat.pending && (chat.messages.at(-1)?.content ?? '') === '');
	const canSend = $derived(!chat.pending && chat.draft.trim() !== '');

	export function focusInput(): void {
		(consent.accepted ? field : accept)?.focus();
	}

	async function keepInView(): Promise<void> {
		await tick();
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const behavior = reduced ? 'auto' : 'smooth';
		if (panel) log?.scrollTo({ top: log.scrollHeight, behavior });
		else end?.scrollIntoView({ block: 'nearest', behavior });
	}

	async function submit(text: string): Promise<void> {
		const sending = chat.send(text);
		void keepInView();
		await sending;
		void keepInView();
	}

	function handleSubmit(event: SubmitEvent): void {
		event.preventDefault();
		if (canSend) void submit(chat.draft);
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key !== 'Enter' || event.shiftKey || event.isComposing) return;
		event.preventDefault();
		if (canSend) void submit(chat.draft);
	}
</script>

<div class="body" class:panel>
	<p class="notice">
		No escribas tu nombre ni datos que te identifiquen. Las respuestas salen de los datos de este
		sitio y pueden tener errores.
	</p>

	<div class="gate">
		<h2 id="{id}-gate-title">Acepta el aviso de privacidad para preguntar</h2>
		<p class="muted">Por favor, lee el aviso de privacidad antes de continuar.</p>
		<ChoiceGroup>
			<button type="button" class="choice primary" bind:this={accept} onclick={acceptConsent}>Aceptar</button>
			<a class="choice" href="/privacidad">Leer aviso de privacidad</a>
		</ChoiceGroup>
		<noscript>
			<p class="muted">El chat necesita JavaScript. El resto del sitio funciona sin él.</p>
		</noscript>
	</div>

	<div class="chat">
		<div class="log" aria-live="polite" aria-busy={chat.pending} bind:this={log}>
			{#each chat.messages as message, index (index)}
				{#if message.role === 'user' || message.content !== ''}
					<Message role={message.role} content={message.content} />
				{/if}
			{/each}
			{#if waiting}
				<p class="typing">Escribiendo…</p>
			{/if}
			<div class="end" bind:this={end}></div>
		</div>

		{#if chat.error}
			<p class="problem" role="alert">{chat.error}</p>
		{/if}

		{#if chat.messages.length === 0}
			<section class="examples" aria-labelledby="{id}-examples-title">
				<h2 id="{id}-examples-title">Algunas preguntas para empezar</h2>
				<ul>
					{#each EXAMPLES as example (example)}
						<li>
							<button type="button" class="example" disabled={chat.pending} onclick={() => submit(example)}>
								{example}
							</button>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		<form class="composer" onsubmit={handleSubmit}>
			<label for="{id}-question">Tu pregunta</label>
			<textarea
				id="{id}-question"
				rows={panel ? 2 : 3}
				maxlength={MAX_CHARS}
				autocomplete="off"
				bind:this={field}
				bind:value={chat.draft}
				onkeydown={handleKeydown}
			></textarea>
			<div class="actions">
				<span class="hint">Enter envía; Shift + Enter hace un salto de línea.</span>
				<Button type="submit" disabled={!canSend}>Enviar</Button>
			</div>
		</form>
	</div>
</div>

<style>
	.notice {
		max-width: var(--measure);
		padding: 0 32px 20px;
		color: var(--ink-soft);
	}

	.muted {
		color: var(--ink-soft);
	}

	.gate {
		display: grid;
		justify-items: start;
		gap: 12px;
		padding: 24px 32px 28px;
		border-top: 1px solid var(--rule);
		background: var(--map);
	}

	.gate h2 {
		max-width: 28ch;
		font-size: 19px;
	}

	.gate p {
		max-width: 44ch;
	}

	.chat {
		display: none;
		border-top: 1px solid var(--rule);
	}

	:global(html[data-consent='yes']) .gate {
		display: none;
	}

	:global(html[data-consent='yes']) .chat {
		display: block;
	}

	.log > :global(.message + .message) {
		border-top: 1px solid var(--rule);
	}

	.typing {
		padding: 14px 32px;
		border-top: 1px solid var(--rule);
		font-size: 15px;
		color: var(--ink-soft);
	}

	.end {
		scroll-margin-bottom: 24px;
	}

	.problem {
		padding: 12px 32px;
		border-top: 1px solid var(--rule);
		background: var(--guinda-tint);
		color: var(--ink);
	}

	.examples {
		padding: 18px 32px 8px;
		border-top: 1px solid var(--rule);
	}

	.examples h2 {
		margin-bottom: 6px;
		font-size: 15px;
		font-weight: 500;
		color: var(--ink-soft);
	}

	.examples li + li {
		border-top: 1px solid var(--rule);
	}

	.example {
		display: flex;
		align-items: center;
		width: 100%;
		min-height: 48px;
		padding: 8px 0;
		border: 0;
		background: transparent;
		color: var(--guinda);
		font-family: var(--font-body);
		font-size: 17px;
		line-height: 1.35;
		text-align: left;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
		cursor: pointer;
	}

	.example:hover {
		text-decoration-thickness: 2px;
	}

	.example:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.composer {
		display: grid;
		gap: 6px;
		padding: 20px 32px 28px;
		border-top: 1px solid var(--rule);
		background: var(--tint);
	}

	.composer label {
		font-size: 15px;
		font-weight: 500;
	}

	textarea {
		width: 100%;
		max-width: var(--measure);
		min-height: 88px;
		padding: 10px 12px;
		border: 1px solid var(--line);
		border-radius: var(--radius-sm);
		background: var(--white);
		color: var(--ink);
		font-family: var(--font-body);
		font-size: 17px;
		line-height: 1.45;
		resize: vertical;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 10px 16px;
		max-width: var(--measure);
		margin-top: 6px;
	}

	.hint {
		font-size: 14px;
		color: var(--ink-soft);
	}

	.panel {
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;
		min-height: 0;
	}

	.panel .notice {
		padding: 12px 16px;
		font-size: 15px;
		line-height: 1.45;
	}

	.panel .gate {
		padding: 16px;
	}

	.panel .gate h2 {
		font-size: 17px;
	}

	:global(html[data-consent='yes']) .panel .chat {
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;
		min-height: 0;
	}

	.panel .log {
		flex: 1 1 auto;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
	}

	.panel .log > :global(.message) {
		padding: 12px 16px 14px;
	}

	.panel .typing,
	.panel .problem {
		flex: none;
		padding-inline: 16px;
	}

	.panel .examples {
		flex: none;
		padding: 12px 16px 4px;
	}

	.panel .example {
		min-height: 44px;
		font-size: 16px;
	}

	.panel .composer {
		flex: none;
		padding: 12px 16px 14px;
	}

	.panel textarea {
		min-height: 64px;
		font-size: 16px;
	}

	.panel .hint {
		display: none;
	}

	.panel .actions {
		justify-content: flex-end;
	}

	@media (max-width: 899px) {
		.notice {
			padding: 0 16px 16px;
		}

		.gate {
			padding: 20px 16px 24px;
		}

		.typing,
		.problem {
			padding-inline: 16px;
		}

		.examples {
			padding: 16px 16px 6px;
		}

		.composer {
			padding: 16px 16px 24px;
		}

		.actions :global(.button) {
			width: 100%;
		}

		.panel .actions :global(.button) {
			width: auto;
		}
	}
</style>
