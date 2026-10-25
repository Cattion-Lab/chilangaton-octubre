<script lang="ts">
	import { buildDirectionsUrl } from '#lib/maps/directions-link.ts';
	import { consent } from '#lib/privacy/consent.svelte.ts';
	import type { Clinic, Station } from '#lib/types.ts';
	import ChoiceGroup from './ChoiceGroup.svelte';
	import { acceptConsent } from './consent-actions.ts';
	import DepartureControl from './DepartureControl.svelte';
	import RouteResults from './RouteResults.svelte';
	import type { TripLeg } from './trip-leg.svelte.ts';

	type LegName = 'outbound' | 'return';

	interface Props {
		id: string;
		station: Station | null;
		clinic: Clinic;
		outbound: TripLeg;
		returnTrip: TripLeg;
		activeLeg: LegName;
		oncompute: (leg: LegName) => void;
	}

	let {
		id,
		station,
		clinic,
		outbound,
		returnTrip,
		activeLeg = $bindable(),
		oncompute
	}: Props = $props();

	const leg = $derived(activeLeg === 'outbound' ? outbound : returnTrip);
	const canReturn = $derived(outbound.status === 'done' && outbound.routes.length > 0);
	const failed = $derived(
		leg.status === 'error' || (leg.status === 'done' && leg.routes.length === 0)
	);
	const statusText = $derived.by(() => {
		if (leg.status === 'loading') return 'Calculando trayectos…';
		if (failed) return leg.message;
		if (leg.status === 'done') {
			return leg.routes.length === 1
				? '1 trayecto encontrado'
				: `${leg.routes.length} trayectos encontrados`;
		}
		return '';
	});
	const computeLabel = $derived.by(() => {
		if (leg.status === 'loading') return 'Calculando…';
		if (failed) return 'Reintentar';
		if (leg.status === 'done') return 'Volver a calcular';
		return activeLeg === 'outbound' ? 'Calcular trayecto' : 'Calcular el regreso';
	});

	function openInGoogleMaps(): void {
		if (!station) return;
		const url = buildDirectionsUrl(station.location, clinic.location);
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<div class="trip" {id}>
	{#if !consent.accepted}
		<aside class="consent" aria-label="Aviso de privacidad">
			<p>
				Para calcular trayectos primero lee y acepta el <a href="/privacidad">aviso de privacidad</a
				>. La lista de lugares se puede consultar sin aceptar nada.
			</p>
			<ChoiceGroup>
				<button type="button" class="choice primary" onclick={acceptConsent}>Aceptar</button>
				<a class="choice" href="/privacidad">Leer aviso de privacidad</a>
			</ChoiceGroup>
		</aside>
	{:else if !station}
		<p class="note">Elige una estación arriba para calcular cómo llegar a este lugar.</p>
	{:else}
		<div class="controls">
			<ChoiceGroup>
				<button
					type="button"
					class="choice"
					aria-pressed={activeLeg === 'outbound'}
					onclick={() => (activeLeg = 'outbound')}
				>
					Ida
				</button>
				<button
					type="button"
					class="choice"
					aria-pressed={activeLeg === 'return'}
					disabled={!canReturn}
					onclick={() => (activeLeg = 'return')}
				>
					Regreso
				</button>
			</ChoiceGroup>
			{#if activeLeg === 'return'}
				<DepartureControl
					id="return"
					label="Hora de salida del regreso"
					bind:mode={returnTrip.mode}
					bind:clock={returnTrip.clock}
				/>
			{/if}
			<ChoiceGroup>
				<button
					type="button"
					class="choice primary"
					disabled={leg.status === 'loading'}
					onclick={() => oncompute(activeLeg)}
				>
					{computeLabel}
				</button>
			</ChoiceGroup>
		</div>

		<p class="visually-hidden" role="status" aria-live="polite">{statusText}</p>

		<div class="body" class:loading={leg.status === 'loading'}>
			{#if leg.status === 'loading'}
				<p class="status">Calculando trayectos…</p>
			{:else if failed}
				<p class="alert fade">{leg.message}</p>
			{:else if leg.routes.length > 0}
				<div class="fade">
					<RouteResults
						routes={leg.routes}
						selected={leg.selected}
						onselect={(index) => (leg.selected = index)}
					/>
				</div>
			{:else if activeLeg === 'return'}
				<p class="note">
					Conviene revisar también la vuelta, sobre todo si el horario de regreso es limitado.
				</p>
			{/if}
		</div>
	{/if}

	<div class="foot">
		<p class="muted">
			Son estimaciones con base en el transporte público programado; el tráfico, las suspensiones del
			servicio y los horarios reales pueden cambiar el trayecto. No indican si una ruta es segura.
		</p>
		<p class="links">
			<a href="/clinicas/{clinic.id}">Ver ficha de la clínica</a>
			{#if station}
				<button type="button" class="linklike" onclick={openInGoogleMaps}>
					Abrir en Google Maps
				</button>
			{/if}
		</p>
		{#if station}
			<p class="muted small">
				Al abrir Google Maps, Google recibe esta estación y este lugar como origen y destino.
			</p>
		{/if}
	</div>
</div>

<style>
	.trip {
		margin: 0 32px 20px;
		border: 1px solid var(--rule);
		border-radius: var(--radius);
		background: var(--white);
		animation: fade-in 150ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.controls {
		display: grid;
		justify-items: start;
		gap: 12px;
		padding: 12px 16px;
		border-bottom: 1px solid var(--rule);
	}

	.controls :global(.field) {
		width: 100%;
		max-width: 320px;
	}

	.consent {
		display: grid;
		justify-items: start;
		gap: 12px;
		padding: 12px 16px;
		font-size: 15px;
	}

	.consent a:not(.choice) {
		color: var(--guinda);
		text-underline-offset: 3px;
	}

	.body.loading {
		min-height: 96px;
	}

	.status,
	.note,
	.alert {
		padding: 12px 16px;
		font-size: 15px;
	}

	.status,
	.note {
		color: var(--ink-soft);
	}

	.alert {
		overflow-wrap: anywhere;
		border-left: 3px solid var(--guinda);
		color: var(--ink);
		font-weight: 500;
	}

	.fade {
		animation: fade-in 150ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.foot {
		display: grid;
		gap: 8px;
		padding: 12px 16px;
		border-top: 1px solid var(--rule);
		font-size: 15px;
	}

	.muted {
		color: var(--ink-soft);
	}

	.small {
		font-size: 14px;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 20px;
		font-weight: 500;
	}

	.links a,
	.linklike {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}

	.linklike {
		padding: 0;
		border: 0;
		background: none;
		color: var(--guinda);
		font: inherit;
		font-weight: 500;
		text-decoration: underline;
		text-underline-offset: 3px;
		cursor: pointer;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 899px) {
		.trip {
			margin: 0 16px 16px;
		}
	}
</style>
