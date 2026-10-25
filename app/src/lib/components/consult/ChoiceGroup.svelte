<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="group">
	{@render children()}
</div>

<style>
	.group {
		display: inline-flex;
		max-width: 100%;
	}

	.group :global(.choice) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		padding: 0 18px;
		border: 1px solid var(--line);
		border-radius: 0;
		background: var(--white);
		color: var(--guinda);
		font-family: var(--font-body);
		font-weight: 500;
		font-size: 16px;
		line-height: 1.2;
		text-align: center;
		text-decoration: none;
		cursor: pointer;
	}

	.group :global(.choice + .choice) {
		margin-left: -1px;
	}

	.group :global(.choice:first-child) {
		border-top-left-radius: var(--radius-sm);
		border-bottom-left-radius: var(--radius-sm);
	}

	.group :global(.choice:last-child) {
		border-top-right-radius: var(--radius-sm);
		border-bottom-right-radius: var(--radius-sm);
	}

	.group :global(.choice:hover) {
		background: var(--guinda-tint);
		text-decoration: none;
	}

	.group :global(.choice[aria-pressed='true']) {
		background: var(--guinda-tint);
		color: var(--ink);
		font-weight: 600;
	}

	.group :global(.choice.primary) {
		border-color: var(--guinda);
		background: var(--guinda);
		color: var(--white);
	}

	.group :global(.choice.primary:hover) {
		background: #861d3d;
	}

	.group :global(.choice:disabled) {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.group :global(.choice:disabled:hover) {
		background: var(--white);
	}

	.group :global(.choice.primary:disabled:hover) {
		background: var(--guinda);
	}

	.group :global(.choice:focus-visible) {
		position: relative;
		z-index: 1;
	}

	@media (max-width: 899px) {
		.group {
			display: grid;
			width: 100%;
		}

		.group :global(.choice + .choice) {
			margin-left: 0;
			margin-top: -1px;
		}

		.group :global(.choice) {
			border-radius: 0;
		}

		.group :global(.choice:first-child) {
			border-top-left-radius: var(--radius-sm);
			border-top-right-radius: var(--radius-sm);
		}

		.group :global(.choice:last-child) {
			border-bottom-left-radius: var(--radius-sm);
			border-bottom-right-radius: var(--radius-sm);
		}
	}
</style>
