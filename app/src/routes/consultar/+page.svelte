<script lang="ts">
	import { onMount, tick } from 'svelte';
	import PageMeta from '#lib/components/ui/PageMeta.svelte';
	import ClinicMap from '#lib/components/map/ClinicMap.svelte';
	import ChoiceGroup from '#lib/components/consult/ChoiceGroup.svelte';
	import ClinicList from '#lib/components/consult/ClinicList.svelte';
	import DepartureControl from '#lib/components/consult/DepartureControl.svelte';
	import PickCard from '#lib/components/consult/PickCard.svelte';
	import StationSelect from '#lib/components/consult/StationSelect.svelte';
	import TripPanel from '#lib/components/consult/TripPanel.svelte';
	import { acceptConsent } from '#lib/components/consult/consent-actions.ts';
	import { sortByDistance } from '#lib/components/consult/distance.ts';
	import { TripLeg } from '#lib/components/consult/trip-leg.svelte.ts';
	import { consent } from '#lib/privacy/consent.svelte.ts';
	import { reportedPresence, ROTATING_SITES_NOTE } from '#lib/data/reported-presence.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const PINE = '#1e5b45';
	const WIDE_QUERY = '(min-width: 900px)';

	type Source = 'list' | 'map' | 'card';

	const outbound = new TripLeg('outbound');
	const returnTrip = new TripLeg('return');

	let ready = $state(false);
	let stationId = $state('');
	let selectedClinicId = $state<string | null>(null);
	let pickId = $state<string | null>(null);
	let activeLeg = $state<'outbound' | 'return'>('outbound');

	const station = $derived(data.stations.find((item) => item.id === stationId) ?? null);
	const orderedClinics = $derived(
		station ? sortByDistance(data.clinics, station.location) : data.clinics
	);
	const pick = $derived(data.clinics.find((item) => item.id === pickId) ?? null);
	const shownLeg = $derived(activeLeg === 'outbound' ? outbound : returnTrip);
	const mapPolyline = $derived(shownLeg.routes[shownLeg.selected]?.polyline ?? null);
	const summary = $derived(
		outbound.status === 'done' ? (outbound.routes[outbound.selected] ?? null) : null
	);
	const pendingCount = $derived(
		data.clinics.filter((item) => item.verificationStatus !== 'verificada').length
	);
	const subtitle = $derived(
		pendingCount === data.clinics.length
			? 'Todos los lugares están por verificar.'
			: `${pendingCount} de ${data.clinics.length} lugares están por verificar.`
	);

	onMount(() => {
		consent.load();
		ready = true;
	});

	function resetPlans(): void {
		outbound.reset();
		returnTrip.reset();
		activeLeg = 'outbound';
	}

	async function reveal(clinicId: string): Promise<void> {
		await tick();
		await tick();
		const item = document.getElementById(`clinic-${clinicId}`);
		if (!item) return;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
		const top = item.getBoundingClientRect().top + window.scrollY - (header || 64) - 16;
		window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' });
		item.querySelector<HTMLElement>('h3')?.focus({ preventScroll: true });
	}

	async function showClosest(): Promise<void> {
		await tick();
		await tick();
		const list = document.querySelector<HTMLElement>('.clinics');
		const results = document.getElementById('results-title');
		if (!list || !results) return;
		const style = getComputedStyle(document.documentElement);
		const header = parseFloat(style.getPropertyValue('--header-h')) || 64;
		const covered = parseFloat(style.getPropertyValue('--consent-h')) || 0;
		const rect = list.getBoundingClientRect();
		if (rect.top >= header && rect.top + 120 <= window.innerHeight - covered) return;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const top = results.getBoundingClientRect().top + window.scrollY - header - 16;
		window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' });
	}

	function changeStation(): void {
		resetPlans();
		if (station) void showClosest();
	}

	async function revealCard(): Promise<void> {
		await tick();
		const card = document.querySelector<HTMLElement>('.pick-slot .pick');
		if (!card) return;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		card.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
	}

	async function selectClinic(clinicId: string, source: Source): Promise<void> {
		const unchanged = selectedClinicId === clinicId;
		selectedClinicId = clinicId;
		pickId = source === 'map' ? clinicId : null;
		if (!unchanged) {
			resetPlans();
			if (station && consent.accepted) void outbound.load(station.id, clinicId);
		}
		const wide = window.matchMedia(WIDE_QUERY).matches;
		if (source === 'card' || (source === 'map' && wide)) {
			await reveal(clinicId);
		} else if (source === 'map') {
			await revealCard();
		}
	}

	function revealPrompt(): void {
		const title = document.getElementById('map-prompt-title');
		if (!title) return;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		title.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
		title.focus({ preventScroll: true });
	}

	function toggleClinic(clinicId: string): void {
		if (selectedClinicId === clinicId) {
			selectedClinicId = null;
			pickId = null;
			resetPlans();
			return;
		}
		void selectClinic(clinicId, 'list');
		if (!consent.accepted && !station) revealPrompt();
	}

	async function compute(leg: 'outbound' | 'return'): Promise<void> {
		if (!consent.accepted || !station || !selectedClinicId) return;
		activeLeg = leg;
		await (leg === 'outbound' ? outbound : returnTrip).load(station.id, selectedClinicId);
	}
</script>

<PageMeta
	title="Consultar clínica | RUTA LIBRE"
	description="Consulta clínicas ILE y espacios de orientación en la Ciudad de México y compara cómo llegar en transporte público: tiempo, transbordos, caminata y regreso."
/>

<main id="main" class="consult">
	<div class="consult-main">
		<header class="consult-head">
			<h1>Consultar cómo llegar</h1>
			<p>Trayectos en transporte público. {subtitle}</p>
		</header>

		<form class="picker" aria-label="Punto de partida" onsubmit={(event) => event.preventDefault()}>
			<StationSelect groups={data.stationGroups} bind:value={stationId} onchange={changeStation} />
			<DepartureControl
				id="outbound"
				label="Hora de salida"
				bind:mode={outbound.mode}
				bind:clock={outbound.clock}
			/>
			<p class="hint">
				Si prefieres no decirlo, verás la lista de lugares sin trayectos. No pedimos tu ubicación ni
				guardamos lo que elijas.
			</p>
		</form>

		<section class="results" aria-labelledby="results-title">
			<div class="results-head">
				<h2 id="results-title">{data.clinics.length} lugares en la Ciudad de México</h2>
				<span class="muted">{station ? `Desde ${station.name}` : 'Sin estación elegida'}</span>
			</div>
			<div class="order" aria-live="polite">
				{#if station}
					<p>Ordenadas por cercanía a {station.name}, en línea recta</p>
				{/if}
			</div>
			<ClinicList
				clinics={orderedClinics}
				selectedId={selectedClinicId}
				{ready}
				hasStation={station !== null}
				{summary}
				ontoggle={toggleClinic}
			>
				{#snippet details(clinic)}
					<TripPanel
						id="trip-{clinic.id}"
						{station}
						{clinic}
						{outbound}
						{returnTrip}
						bind:activeLeg
						oncompute={compute}
					/>
				{/snippet}
			</ClinicList>
		</section>

		<section class="zones" aria-labelledby="zones-title">
			<h2 id="zones-title">Zonas con presencia antiaborto reportada</h2>
			<ul>
				{#each reportedPresence as zone (zone.id)}
					<li>
						{#if zone.frequent}<strong>Punto frecuente de vigilias.</strong>{/if}
						{zone.label} · <a href={zone.sourceUrl}>{zone.source}, {zone.reportedOn}</a>
					</li>
				{/each}
			</ul>
			<p>{ROTATING_SITES_NOTE}</p>
		</section>
	</div>

	<div class="map-wrap">
		<div class="map-slot">
			<div class="map-prompt">
				<h2 id="map-prompt-title" tabindex="-1">Acepta el aviso de privacidad para ver el mapa</h2>
				<p class="muted">Por favor, lee el aviso de privacidad antes de continuar.</p>
				<ChoiceGroup>
					<button type="button" class="choice primary" onclick={acceptConsent}>Aceptar</button>
					<a class="choice" href="/privacidad">Leer aviso de privacidad</a>
				</ChoiceGroup>
				<noscript>
					<p class="muted">El mapa y los trayectos necesitan JavaScript. La lista de lugares funciona sin él.</p>
				</noscript>
			</div>
			<div class="map-box">
				{#if consent.accepted}
					<ClinicMap
						clinics={data.clinics}
						{station}
						{selectedClinicId}
						polyline={mapPolyline}
						lineColor={PINE}
						onselect={(clinicId) => selectClinic(clinicId, 'map')}
					/>
				{/if}
			</div>
		</div>
		<div class="pick-slot" aria-live="polite">
			{#if pick}
				<PickCard clinic={pick} onchoose={() => selectClinic(pick.id, 'card')} />
			{/if}
		</div>
	</div>
</main>

<style>
	.consult {
		display: grid;
		grid-template-columns: minmax(0, 560px) minmax(0, 1fr);
	}

	.consult-main {
		border-right: 1px solid var(--rule);
	}

	.consult-head {
		padding: 28px 32px 20px;
	}

	.consult-head h1 {
		font-size: 26px;
	}

	.consult-head p {
		margin-top: 8px;
		color: var(--ink-soft);
	}

	.picker {
		display: grid;
		grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
		align-items: start;
		margin: 0 32px 24px;
	}

	.picker :global(.field:first-child select) {
		border-radius: var(--radius-sm) 0 0 var(--radius-sm);
	}

	.picker :global(.field:nth-child(2)) {
		margin-left: -1px;
	}

	.picker :global(.field:nth-child(2) select) {
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
	}

	.hint {
		grid-column: 1 / -1;
		margin-top: 8px;
		font-size: 15px;
		color: var(--ink-soft);
	}

	.results-head {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 4px 16px;
		padding: 12px 32px;
		border-top: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
		background: var(--tint);
		font-size: 15px;
	}

	.order p {
		padding: 10px 32px;
		border-bottom: 1px solid var(--rule);
		font-size: 15px;
		color: var(--ink-soft);
	}

	.zones {
		display: grid;
		gap: 8px;
		padding: 20px 32px 28px;
		border-top: 1px solid var(--rule);
		font-size: 15px;
	}

	.zones h2 {
		font-size: 15px;
		font-weight: 500;
	}

	.zones ul {
		display: grid;
		gap: 6px;
		padding-left: 18px;
		list-style: disc;
	}

	.zones p,
	.zones li {
		color: var(--ink-soft);
	}

	.zones a {
		color: var(--guinda);
		text-underline-offset: 3px;
	}

	.results-head h2 {
		font-size: 15px;
		font-weight: 500;
	}

	.muted {
		color: var(--ink-soft);
	}

	.map-slot {
		position: sticky;
		top: calc(var(--header-h) + 1px);
		height: calc(100svh - var(--header-h) - 1px);
		min-height: 420px;
		background: var(--map);
		overflow: hidden;
	}

	.map-prompt {
		position: absolute;
		inset: 0;
		display: grid;
		align-content: center;
		justify-items: start;
		gap: 12px;
		padding: 24px;
	}

	.map-prompt h2 {
		max-width: 22ch;
		font-size: 19px;
	}

	.map-prompt p {
		max-width: 44ch;
	}

	.map-box {
		position: absolute;
		inset: 0;
		display: none;
	}

	:global(html[data-consent='yes']) .map-prompt {
		display: none;
	}

	:global(html[data-consent='yes']) .map-box {
		display: block;
	}

	.pick-slot {
		display: none;
	}

	@media (max-width: 899px) {
		.pick-slot {
			display: block;
		}

		.consult {
			grid-template-columns: 1fr;
		}

		.consult-main {
			display: contents;
			border-right: 0;
		}

		.consult-head {
			order: 1;
			padding: 20px 16px 16px;
		}

		.consult-head h1 {
			font-size: 23px;
		}

		.picker {
			order: 2;
			grid-template-columns: 1fr;
			margin: 0;
			padding: 16px;
			border-top: 1px solid var(--rule);
			background: var(--tint);
		}

		.picker :global(.field + .field) {
			margin-top: 12px;
			margin-left: 0;
		}

		.picker :global(.field:first-child select),
		.picker :global(.field:nth-child(2) select) {
			border-radius: var(--radius-sm);
		}

		.map-wrap {
			order: 3;
			border-top: 1px solid var(--rule);
		}

		.map-slot {
			position: relative;
			top: 0;
			height: 48svh;
			min-height: 18rem;
		}

		.results {
			order: 4;
		}

		.results-head {
			padding: 10px 16px;
		}

		.order p {
			padding: 10px 16px;
		}

		.zones {
			padding: 18px 16px 24px;
		}
	}
</style>
