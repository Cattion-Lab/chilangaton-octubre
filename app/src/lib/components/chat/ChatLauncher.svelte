<script lang="ts">
	import { tick } from 'svelte';
	import { page } from '$app/state';
	import ChatBody from '#lib/components/chat/ChatBody.svelte';
	import { chat } from '#lib/chat/session.svelte.ts';

	let launcher = $state<HTMLButtonElement>();
	let body = $state<ReturnType<typeof ChatBody>>();

	const hidden = $derived(page.url.pathname === '/preguntar');
	const overMap = $derived(page.url.pathname === '/consultar');

	$effect(() => {
		if (hidden) chat.open = false;
	});

	async function toggle(): Promise<void> {
		if (chat.open) {
			close();
			return;
		}
		chat.open = true;
		await tick();
		body?.focusInput();
	}

	function close(): void {
		chat.open = false;
		launcher?.focus();
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape' && !event.repeat && chat.open) close();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if !hidden}
	<a class="launcher link" class:lifted={overMap} href="/preguntar">
		<svg viewBox="0 0 20 20" aria-hidden="true">
			<path
				d="M3 4.5h14v9H8.5L5 16.5v-3H3z"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linejoin="round"
			/>
		</svg>
		Preguntar
	</a>
	<button
		type="button"
		class="launcher action"
		class:lifted={overMap}
		aria-expanded={chat.open}
		aria-controls="chat-panel"
		onclick={toggle}
		bind:this={launcher}
	>
		<svg viewBox="0 0 20 20" aria-hidden="true">
			<path
				d="M3 4.5h14v9H8.5L5 16.5v-3H3z"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linejoin="round"
			/>
		</svg>
		Preguntar
	</button>

	<div
		id="chat-panel"
		class="panel"
		class:lifted={overMap}
		role="dialog"
		aria-modal="false"
		aria-labelledby="chat-panel-title"
		hidden={!chat.open}
	>
		<header class="panel-head">
			<h2 id="chat-panel-title">Preguntar</h2>
			<button type="button" class="close" onclick={close}>Cerrar</button>
		</header>
		<ChatBody id="panel" panel bind:this={body} />
	</div>
{/if}

<style>
	.launcher,
	.panel {
		--lift: 0px;
	}

	.launcher {
		position: fixed;
		right: max(16px, env(safe-area-inset-right));
		bottom: calc(max(16px, env(safe-area-inset-bottom)) + var(--consent-h, 0px) + var(--lift));
		z-index: 900;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		min-width: 44px;
		min-height: 44px;
		padding: 0 18px;
		border: 1px solid var(--line);
		border-radius: var(--radius-sm);
		background: var(--white);
		color: var(--guinda);
		font-family: var(--font-body);
		font-size: 16px;
		font-weight: 500;
		line-height: 1.2;
		text-decoration: none;
		cursor: pointer;
		transition: background-color 120ms ease;
	}

	.launcher:hover {
		background: var(--guinda-tint);
		text-decoration: none;
	}

	.launcher svg {
		width: 20px;
		height: 20px;
		flex: none;
	}

	.action {
		display: none;
	}

	:global(html[data-js='yes']) .link {
		display: none;
	}

	:global(html[data-js='yes']) .action {
		display: inline-flex;
	}

	.action[aria-expanded='true'] {
		background: var(--guinda-tint);
	}

	.panel {
		position: fixed;
		right: max(16px, env(safe-area-inset-right));
		bottom: calc(max(16px, env(safe-area-inset-bottom)) + var(--consent-h, 0px) + var(--lift) + 56px);
		z-index: 950;
		display: flex;
		flex-direction: column;
		width: 380px;
		height: min(560px, calc(100dvh - var(--header-h) - var(--consent-h, 0px) - var(--lift) - 88px));
		min-height: 320px;
		overflow: hidden;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--white);
	}

	.panel[hidden] {
		display: none;
	}

	.panel-head {
		display: flex;
		flex: none;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 4px 8px 4px 16px;
		border-bottom: 1px solid var(--rule);
	}

	.panel-head h2 {
		font-size: 19px;
	}

	.close {
		min-height: 44px;
		padding: 0 12px;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--guinda);
		font-family: var(--font-body);
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
	}

	.close:hover {
		background: var(--guinda-tint);
	}

	@media (min-width: 900px) {
		.lifted {
			--lift: 96px;
		}
	}

	@media (max-width: 899px) {
		.panel {
			top: var(--header-h);
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 1100;
			width: auto;
			height: auto;
			min-height: 0;
			padding-bottom: env(safe-area-inset-bottom);
			border-right: 0;
			border-bottom: 0;
			border-left: 0;
			border-radius: var(--radius-lg) var(--radius-lg) 0 0;
		}
	}

	@media print {
		.launcher,
		.panel {
			display: none;
		}
	}
</style>
