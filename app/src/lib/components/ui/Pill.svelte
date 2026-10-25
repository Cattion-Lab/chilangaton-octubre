<script lang="ts">
	import type { Snippet } from 'svelte';

	type Tone = 'berry' | 'pine' | 'sun' | 'ink' | 'paper' | 'pending' | 'verified';

	let { tone = 'berry', children }: { tone?: Tone; children: Snippet } = $props();
</script>

<span class="status {tone}">
	{#if tone === 'pending'}
		<svg viewBox="0 0 16 16" aria-hidden="true">
			<circle
				cx="8"
				cy="8"
				r="6.2"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-dasharray="2.4 2"
			/>
			<path
				d="M8 4.8V8l2 1.6"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linecap="round"
			/>
		</svg>
	{:else if tone === 'verified'}
		<svg viewBox="0 0 16 16" aria-hidden="true">
			<circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.6" />
			<path
				d="M5.2 8.2l2 2 3.6-4"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{/if}
	{@render children()}
</span>

<style>
	.status {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 2px 8px;
		border-radius: 4px;
		background: var(--tint);
		color: var(--ink);
		font-size: 14px;
		font-weight: 500;
		line-height: 1.5;
		white-space: nowrap;
	}

	.status svg {
		width: 14px;
		height: 14px;
		flex: none;
	}

	.berry {
		background: var(--guinda-tint);
		color: var(--guinda);
	}

	.pine,
	.verified {
		background: color-mix(in srgb, var(--pino) 12%, var(--white));
		color: var(--pino);
	}

	.ink {
		background: var(--ink);
		color: var(--white);
	}

	.paper {
		background: var(--white);
		box-shadow: inset 0 0 0 1px var(--rule);
	}

	@media (forced-colors: active) {
		.status {
			border: 1px solid CanvasText;
		}
	}
</style>
