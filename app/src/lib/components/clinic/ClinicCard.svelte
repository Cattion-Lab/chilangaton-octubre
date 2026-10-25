<script lang="ts">
	import VerificationBadge from '#lib/components/clinic/VerificationBadge.svelte';
	import type { Clinic } from '#lib/types.ts';

	let { clinic }: { clinic: Clinic } = $props();
</script>

<article class="row">
	<h2><a href="/clinicas/{clinic.id}">{clinic.name}</a></h2>
	<p class="where">
		<span>{clinic.borough}</span>
		<VerificationBadge {clinic} />
	</p>
	<svg class="arrow" viewBox="0 0 20 20" aria-hidden="true">
		<path
			d="M7 4l6 6-6 6"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</article>

<style>
	.row {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 4px 20px;
		align-items: center;
		padding: 18px 32px;
	}

	.row {
		transition: background-color 120ms ease;
	}

	.row:hover {
		background: var(--guinda-tint);
	}

	h2 {
		font-size: 18px;
		font-weight: 500;
		line-height: 1.35;
	}

	h2 a {
		color: var(--ink);
		text-decoration: none;
	}

	h2 a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	h2 a:focus-visible {
		outline: none;
	}

	h2 a:focus-visible::after {
		outline: 2px solid var(--guinda);
		outline-offset: -2px;
	}

	h2 a:hover {
		color: var(--guinda);
	}

	.where {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 4px 10px;
		font-size: 15px;
		color: var(--ink-soft);
	}

	.arrow {
		grid-column: 2;
		grid-row: 1 / span 2;
		width: 20px;
		height: 20px;
		color: var(--guinda);
	}

	@media (max-width: 899px) {
		.row {
			gap: 4px 12px;
			padding: 16px;
		}

		h2 {
			font-size: 17px;
		}
	}
</style>
