<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		title,
		wide = false,
		children
	}: { id: string; title: string; wide?: boolean; children: Snippet } = $props();
</script>

<section class="section" class:wide aria-labelledby="{id}-title">
	<h2 id="{id}-title">{title}</h2>
	<div class="body">
		{@render children()}
	</div>
</section>

<style>
	.section {
		max-width: var(--measure);
		margin-top: 36px;
		padding-top: 28px;
		border-top: 1px solid var(--rule);
	}

	.section.wide {
		max-width: none;
	}

	h2 {
		margin-bottom: 14px;
		font-size: 22px;
	}

	.body {
		display: grid;
		gap: 12px;
	}

	@media (max-width: 899px) {
		.section {
			margin-top: 28px;
			padding-top: 22px;
		}

		h2 {
			font-size: 20px;
		}
	}
</style>
