<script lang="ts">
	import type { ChatRole } from '#lib/chat/limits.ts';
	import { parseReply } from './format.ts';

	let { role, content }: { role: ChatRole; content: string } = $props();

	const blocks = $derived(role === 'assistant' ? parseReply(content) : []);
</script>

<article class="message" class:reply={role === 'assistant'}>
	<p class="who">{role === 'user' ? 'Tú' : 'RUTA LIBRE'}</p>
	{#if role === 'user'}
		<p class="own">{content}</p>
	{:else}
		<div class="body">
			{#each blocks as block, index (index)}
				{#if block.kind === 'paragraph'}
					<p>
						{#each block.pieces as piece, at (at)}
							{#if piece.href}<a href={piece.href}>{piece.text}</a>{:else}{piece.text}{/if}
						{/each}
					</p>
				{:else}
					<ul>
						{#each block.items as item, row (row)}
							<li>
								{#each item as piece, at (at)}
									{#if piece.href}<a href={piece.href}>{piece.text}</a>{:else}{piece.text}{/if}
								{/each}
							</li>
						{/each}
					</ul>
				{/if}
			{/each}
		</div>
	{/if}
</article>

<style>
	.message {
		padding: 18px 32px 20px;
	}

	.who {
		margin-bottom: 4px;
		font-size: 14px;
		font-weight: 500;
		color: var(--ink-soft);
	}

	.reply .who {
		color: var(--guinda);
	}

	.own {
		max-width: var(--measure);
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}

	.body {
		display: grid;
		gap: 10px;
		max-width: var(--measure);
	}

	ul {
		padding-left: 1.2em;
		list-style: disc;
	}

	li + li {
		margin-top: 6px;
	}

	li::marker {
		color: var(--guinda);
	}

	@media (max-width: 899px) {
		.message {
			padding: 16px 16px 18px;
		}
	}
</style>
