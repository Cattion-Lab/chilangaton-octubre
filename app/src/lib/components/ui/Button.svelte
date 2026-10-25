<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'ghost';

	let {
		href,
		type = 'button',
		variant = 'primary',
		disabled = false,
		fullWidth = false,
		onclick,
		children
	}: {
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		variant?: Variant;
		disabled?: boolean;
		fullWidth?: boolean;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	} = $props();
</script>

{#if href && !disabled}
	<a class="button {variant}" class:full={fullWidth} {href} {onclick}>{@render children()}</a>
{:else}
	<button class="button {variant}" class:full={fullWidth} {type} {disabled} {onclick}>
		{@render children()}
	</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		min-height: 44px;
		padding: 0 18px;
		border: 1px solid var(--line);
		border-radius: var(--radius-sm);
		background: var(--white);
		color: var(--guinda);
		font-family: var(--font-body);
		font-weight: 500;
		font-size: 16px;
		line-height: 1.2;
		text-align: center;
		text-decoration: none;
		cursor: pointer;
		transition:
			background-color 120ms ease,
			border-color 120ms ease;
	}

	.button:hover {
		background: var(--guinda-tint);
		text-decoration: none;
	}

	.button:active {
		background: var(--tint);
	}

	.full {
		width: 100%;
	}

	.primary {
		border-color: var(--guinda);
		background: var(--guinda);
		color: var(--white);
	}

	.primary:hover {
		background: #861d3d;
		color: var(--white);
	}

	.primary:active {
		background: #751733;
	}

	.secondary {
		background: var(--white);
		color: var(--guinda);
	}

	.ghost {
		border-color: transparent;
		background: transparent;
		color: var(--ink-soft);
	}

	.ghost:hover {
		background: var(--tint);
	}

	.button:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.button:disabled:hover {
		background: var(--white);
	}

	.primary:disabled:hover {
		background: var(--guinda);
	}
</style>
