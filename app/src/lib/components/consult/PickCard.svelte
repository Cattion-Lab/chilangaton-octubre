<script lang="ts">
	import VerificationBadge from '#lib/components/clinic/VerificationBadge.svelte';
	import type { Clinic } from '#lib/types.ts';
	import ChoiceGroup from './ChoiceGroup.svelte';

	interface Props {
		clinic: Clinic;
		onchoose: () => void;
	}

	let { clinic, onchoose }: Props = $props();
</script>

<section class="pick" aria-label="Lugar seleccionado en el mapa">
	<h2>{clinic.name}</h2>
	<p class="where">
		<span>{clinic.borough}</span>
		<VerificationBadge {clinic} />
	</p>
	<ChoiceGroup>
		<button type="button" class="choice primary" onclick={onchoose}>Elegir este lugar</button>
		<a class="choice" href="/clinicas/{clinic.id}">Ver ficha</a>
	</ChoiceGroup>
</section>

<style>
	.pick {
		display: grid;
		justify-items: start;
		gap: 8px;
		padding: 16px;
		scroll-margin-bottom: 16px;
		border-top: 1px solid var(--rule);
		background: var(--guinda-tint);
		animation: pick-in 150ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	h2 {
		font-size: 17px;
		font-weight: 500;
		line-height: 1.35;
		overflow-wrap: anywhere;
	}

	.where {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 4px 10px;
		font-size: 15px;
		color: var(--ink-soft);
	}

	.pick :global(.group) {
		margin-top: 4px;
	}

	@keyframes pick-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
