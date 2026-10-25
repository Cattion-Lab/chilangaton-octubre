<script lang="ts">
	import type { Snippet } from 'svelte';
	import VerificationBadge from '#lib/components/clinic/VerificationBadge.svelte';
	import { KIND_LABELS } from '#lib/components/clinic/labels.ts';
	import type { Clinic, RouteOption } from '#lib/types.ts';
	import { transfersText } from './format.ts';

	const VISIBLE_COUNT = 5;

	interface Props {
		clinics: Clinic[];
		selectedId: string | null;
		ready: boolean;
		hasStation: boolean;
		summary: RouteOption | null;
		ontoggle: (clinicId: string) => void;
		details: Snippet<[Clinic]>;
	}

	let { clinics, selectedId, ready, hasStation, summary, ontoggle, details }: Props = $props();

	let expanded = $state(false);

	const first = $derived(clinics.slice(0, VISIBLE_COUNT));
	const rest = $derived(clinics.slice(VISIBLE_COUNT));

	$effect(() => {
		if (selectedId && rest.some((item) => item.id === selectedId)) expanded = true;
	});

	function toggleLabel(open: boolean): string {
		if (open) return 'Ocultar trayecto';
		return hasStation ? 'Ver trayecto' : 'Ver en el mapa';
	}
</script>

{#snippet row(clinic: Clinic)}
	{@const open = clinic.id === selectedId}
	<li class:is-open={open} id="clinic-{clinic.id}" aria-current={open ? 'true' : undefined}>
		<div class="clinic-row">
			<h3 tabindex="-1">{clinic.name}</h3>
			<p class="where">
				<span>{KIND_LABELS[clinic.kind]} · {clinic.borough}</span>
				<VerificationBadge {clinic} />
			</p>
			{#if open && summary}
				<p class="time">
					<span class="mins">{summary.minutes} min</span>
					<span class="meta">{transfersText(summary.transfers)}</span>
					<span class="meta">{summary.walkingMinutes} min a pie</span>
				</p>
			{/if}
			<p class="actions">
				<button
					type="button"
					class="toggle"
					class:pending={!ready}
					aria-expanded={open}
					aria-controls={open ? `trip-${clinic.id}` : undefined}
					tabindex={ready ? undefined : -1}
					onclick={() => ontoggle(clinic.id)}
				>
					{toggleLabel(open)}
				</button>
				<a class="toggle" href="/clinicas/{clinic.id}">Ver ficha</a>
			</p>
		</div>
		{#if open}
			{@render details(clinic)}
		{/if}
	</li>
{/snippet}

{#if clinics.length === 0}
	<p class="empty">No hay lugares para mostrar por ahora. Vuelve a intentarlo en un rato.</p>
{:else}
	<ul class="clinics">
		{#each first as clinic (clinic.id)}
			{@render row(clinic)}
		{/each}
	</ul>
	{#if rest.length > 0}
		<details class="more" bind:open={expanded}>
			<summary>
				{expanded ? `Ocultar los otros ${rest.length} lugares` : `Ver los otros ${rest.length} lugares`}
			</summary>
			<ul class="clinics">
				{#each rest as clinic (clinic.id)}
					{@render row(clinic)}
				{/each}
			</ul>
		</details>
	{/if}
{/if}

<style>
	.clinics li {
		position: relative;
	}

	.clinics li + li {
		border-top: 1px solid var(--rule);
	}

	.empty {
		padding: 18px 32px;
		color: var(--ink-soft);
	}

	.clinic-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 4px;
		padding: 18px 32px;
	}

	h3 {
		min-width: 0;
		font-size: 18px;
		font-weight: 500;
		line-height: 1.35;
		overflow-wrap: anywhere;
	}

	.where {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 4px 10px;
		min-width: 0;
		font-size: 15px;
		color: var(--ink-soft);
	}

	.where > :global(*) {
		min-width: 0;
	}

	.time {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 2px 14px;
		min-width: 0;
		font-size: 15px;
	}

	.mins {
		font-size: 20px;
		font-weight: 600;
		line-height: 1.2;
	}

	.meta {
		color: var(--ink-soft);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0 24px;
	}

	.toggle {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0;
		border: 0;
		background: none;
		color: var(--guinda);
		font: inherit;
		font-size: 15px;
		font-weight: 500;
		text-decoration: underline;
		text-underline-offset: 3px;
		cursor: pointer;
	}

	.toggle.pending {
		visibility: hidden;
	}

	.is-open {
		background: var(--guinda-tint);
	}

	.is-open::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 3px;
		background: var(--guinda);
	}

	.is-open .clinic-row {
		padding-bottom: 12px;
	}

	.more summary {
		display: flex;
		align-items: center;
		min-height: 44px;
		padding: 16px 32px 20px;
		border-top: 1px solid var(--rule);
		color: var(--guinda);
		font-weight: 500;
		text-decoration: underline;
		text-underline-offset: 3px;
		cursor: pointer;
		list-style: none;
	}

	.more summary::-webkit-details-marker {
		display: none;
	}

	.more[open] > .clinics > li:first-child {
		border-top: 1px solid var(--rule);
	}

	@media (max-width: 899px) {
		.empty {
			padding: 16px;
		}

		.clinic-row {
			padding: 16px;
		}

		h3 {
			font-size: 17px;
		}

		.more summary {
			padding: 14px 16px 18px;
		}
	}
</style>
