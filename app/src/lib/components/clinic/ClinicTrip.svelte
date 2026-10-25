<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import DepartureControl from '#lib/components/consult/DepartureControl.svelte';
	import StationSelect from '#lib/components/consult/StationSelect.svelte';
	import { TripLeg } from '#lib/components/consult/trip-leg.svelte.ts';
	import TripResults from '#lib/components/clinic/TripResults.svelte';
	import { buildDirectionsUrl } from '#lib/maps/directions-link.ts';
	import { consent } from '#lib/privacy/consent.svelte.ts';
	import type { Clinic, Station, TransitSystem } from '#lib/types.ts';

	interface StationGroup {
		system: TransitSystem;
		label: string;
		stations: Station[];
	}

	interface Props {
		clinic: Clinic;
		groups: StationGroup[];
		stations: Station[];
	}

	let { clinic, groups, stations }: Props = $props();

	const outbound = new TripLeg('outbound');
	const returnTrip = new TripLeg('return');

	let mounted = $state(false);
	let stationId = $state('');

	const station = $derived(stations.find((item) => item.id === stationId) ?? null);

	onMount(() => {
		consent.load();
		mounted = true;
	});

	function resetPlans(): void {
		outbound.reset();
		returnTrip.reset();
	}

	async function computeOutbound(): Promise<void> {
		if (!station) return;
		await outbound.load(station.id, clinic.id);
	}

	async function computeReturn(): Promise<void> {
		if (!station) return;
		await returnTrip.load(station.id, clinic.id);
	}

	function openInGoogleMaps(): void {
		if (!station) return;
		const url = buildDirectionsUrl(station.location, clinic.location);
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<div class="trip">
	{#if !mounted}
		<noscript>
			<p class="muted">
				El cálculo de trayectos necesita JavaScript. La dirección y el horario de arriba están
				disponibles sin él.
			</p>
		</noscript>
		<p class="muted" aria-live="polite">Cargando el cálculo de trayectos…</p>
	{:else if !consent.accepted}
		<aside class="notice" aria-label="Aviso de privacidad">
			<p>
				Para calcular trayectos primero lee y acepta el <a href="/privacidad">aviso de privacidad</a
				>. Los datos de esta ficha se pueden consultar sin aceptar nada.
			</p>
		</aside>
	{:else}
		<StationSelect {groups} bind:value={stationId} onchange={resetPlans} />

		{#if !station}
			<p class="muted">Elige una estación para calcular el trayecto hacia esta clínica.</p>
		{:else}
			<div class="panel">
				<DepartureControl
					id="outbound"
					label="¿Cuándo saldrías?"
					bind:mode={outbound.mode}
					bind:clock={outbound.clock}
				/>
				<div>
					<Button onclick={computeOutbound} disabled={outbound.status === 'loading'}>
						{outbound.status === 'loading' ? 'Calculando…' : 'Calcular trayecto de ida'}
					</Button>
				</div>
			</div>

			<div aria-live="polite">
				{#if outbound.status === 'error' || (outbound.status === 'done' && outbound.routes.length === 0)}
					<p class="alert" role="alert">{outbound.message}</p>
				{/if}
				{#if outbound.routes.length > 0}
					<TripResults title="Trayectos de ida" routes={outbound.routes} />
				{/if}
			</div>

			{#if outbound.status === 'done' && outbound.routes.length > 0}
				<div class="panel">
					<h3>¿Y el regreso?</h3>
					<p class="muted">
						Conviene revisar también la vuelta, sobre todo si el horario de regreso es limitado.
					</p>
					<DepartureControl
						id="return"
						label="¿Cuándo saldrías de regreso?"
						bind:mode={returnTrip.mode}
						bind:clock={returnTrip.clock}
					/>
					<div>
						<Button
							variant="secondary"
							onclick={computeReturn}
							disabled={returnTrip.status === 'loading'}
						>
							{returnTrip.status === 'loading' ? 'Calculando…' : 'Calcular el regreso'}
						</Button>
					</div>
				</div>

				<div aria-live="polite">
					{#if returnTrip.status === 'error' || (returnTrip.status === 'done' && returnTrip.routes.length === 0)}
						<p class="alert" role="alert">{returnTrip.message}</p>
					{/if}
					{#if returnTrip.routes.length > 0}
						<TripResults title="Trayectos de regreso" routes={returnTrip.routes} />
					{/if}
				</div>
			{/if}

			<p class="muted">
				Son estimaciones con base en el transporte público programado; el tráfico, las
				suspensiones del servicio y los horarios reales pueden cambiar el trayecto. No indican si
				una ruta es segura.
			</p>

			<div class="panel">
				<p class="muted">
					Si prefieres, puedes abrir Google Maps con esta estación y esta clínica. Se abrirá una
					pestaña de Google Maps y Google recibirá ese origen y destino.
				</p>
				<div>
					<Button variant="secondary" onclick={openInGoogleMaps}>Abrir en Google Maps</Button>
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
	.trip {
		display: grid;
		gap: 16px;
	}

	.muted {
		max-width: var(--measure);
		font-size: 15px;
		color: var(--ink-soft);
	}

	.notice {
		padding: 12px 16px;
		border-radius: var(--radius-sm);
		background: var(--tint);
	}

	.panel {
		display: grid;
		gap: 12px;
		padding: 16px;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: var(--radius);
	}

	.panel h3 {
		font-size: 16px;
		font-weight: 500;
	}

	.alert {
		padding: 12px 16px;
		font-weight: 500;
		color: var(--guinda);
		background: var(--guinda-tint);
		border: 1px solid var(--guinda);
		border-radius: var(--radius-sm);
	}
</style>
