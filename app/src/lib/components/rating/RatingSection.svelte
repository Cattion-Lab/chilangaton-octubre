<script lang="ts">
	import { onMount } from 'svelte';
	import { consent } from '#lib/privacy/consent.svelte.ts';
	import Button from '#lib/components/ui/Button.svelte';
	import Star from './Star.svelte';
	import {
		CRITERIA,
		MIN_RATINGS_FOR_SUMMARY,
		type CriterionKey,
		type RatingSummary,
		type RatingsResponse
	} from './criteria.ts';

	let { clinicId }: { clinicId: string } = $props();

	let summary = $state<RatingSummary>({ enough: false });
	let scores = $state<Partial<Record<CriterionKey, number>>>({});
	let status = $state<'idle' | 'sending' | 'done'>('idle');
	let errorMessage = $state('');
	let loadFailed = $state(false);

	const hasScore = $derived(Object.keys(scores).length > 0);
	const formEnabled = $derived(consent.accepted && status !== 'sending');

	async function loadRatings() {
		try {
			const response = await fetch(`/api/ratings?clinicId=${encodeURIComponent(clinicId)}`);
			if (!response.ok) {
				loadFailed = true;
				return;
			}
			const data = (await response.json()) as RatingsResponse;
			summary = data.summary;
			loadFailed = false;
		} catch {
			loadFailed = true;
		}
	}

	onMount(loadRatings);

	function clearScore(key: CriterionKey) {
		const { [key]: _removed, ...rest } = scores;
		scores = rest;
	}

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		if (!hasScore || !formEnabled) return;
		status = 'sending';
		errorMessage = '';
		try {
			const response = await fetch('/api/ratings', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ clinicId, scores })
			});
			const data = (await response.json()) as { message?: string };
			if (!response.ok) {
				errorMessage = data.message ?? 'No pudimos enviar tu calificación. Inténtalo de nuevo.';
				status = 'idle';
				return;
			}
			scores = {};
			status = 'done';
			loadRatings();
		} catch {
			errorMessage = 'No pudimos enviar tu calificación. Revisa tu conexión e inténtalo de nuevo.';
			status = 'idle';
		}
	}

	function formatAverage(value: number): string {
		return value.toLocaleString('es-MX', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
	}
</script>

<section class="ratings" aria-labelledby="ratings-title">
	<h2 id="ratings-title">Calificaciones anónimas</h2>

	<p class="intro">
		Si fuiste, tu experiencia ayuda a otras personas a saber qué esperar. No pedimos tu nombre ni
		guardamos tu IP ni la hora en que calificas.
	</p>

	<div class="summary">
		{#if loadFailed}
			<div class="load-error" role="alert">
				<p>No pudimos cargar las calificaciones. Revisa tu conexión e inténtalo de nuevo.</p>
				<Button variant="secondary" onclick={loadRatings}>Reintentar</Button>
			</div>
		{:else if summary.enough && summary.averages}
			<p class="avg-head">
				<strong>Promedio de {summary.count} calificaciones</strong>
				<span class="muted">de 1 a 5</span>
			</p>
			<dl class="averages">
				{#each CRITERIA as criterion (criterion.key)}
					{@const average = summary.averages[criterion.key]}
					{#if average !== undefined}
						<div class="average">
							<dt>{criterion.label}</dt>
							<dd>
								<span class="stars">
									{#each [1, 2, 3, 4, 5] as position (position)}
										<Star fill={Math.max(0, Math.min(1, average - (position - 1)))} />
									{/each}
								</span>
								<span class="number">{formatAverage(average)} de 5</span>
							</dd>
						</div>
					{/if}
				{/each}
			</dl>
		{:else}
			<p class="muted">
				Aún no hay suficientes calificaciones para mostrar un promedio sin poner en riesgo el
				anonimato. Los promedios aparecen desde {MIN_RATINGS_FOR_SUMMARY} calificaciones.
			</p>
		{/if}
	</div>

	<div class="form-block">
		<h3>Califica tu experiencia</h3>

		{#if status === 'done'}
			<div class="thanks" role="status">
				<p><strong>Gracias por compartir tu experiencia.</strong></p>
				<Button variant="secondary" onclick={() => (status = 'idle')}>Enviar otra calificación</Button>
			</div>
		{:else}
			{#if consent.loaded && !consent.accepted}
				<p class="notice">
					Para calificar necesitas aceptar el aviso de privacidad. Léelo en
					<a href="/privacidad">la página de privacidad</a>.
				</p>
			{/if}

			<form onsubmit={submit} novalidate>
				<fieldset class="criteria" disabled={!formEnabled}>
					<legend class="visually-hidden">Calificación por criterio, de 1 a 5 estrellas</legend>
					<p class="hint">Califica solo lo que quieras; necesitamos al menos un criterio.</p>
					{#each CRITERIA as criterion (criterion.key)}
						<fieldset class="criterion">
							<legend>{criterion.label}</legend>
							<div class="options">
								<div class="radios">
									{#each [1, 2, 3, 4, 5] as value (value)}
										<input
											type="radio"
											class="visually-hidden"
											id="{clinicId}-{criterion.key}-{value}"
											name="{clinicId}-{criterion.key}"
											{value}
											checked={scores[criterion.key] === value}
											onchange={() => (scores = { ...scores, [criterion.key]: value })}
										/>
										<label
											for="{clinicId}-{criterion.key}-{value}"
											class:on={(scores[criterion.key] ?? 0) >= value}
										>
											<Star fill={(scores[criterion.key] ?? 0) >= value ? 1 : 0} />
											<span class="visually-hidden">
												{value} {value === 1 ? 'estrella' : 'estrellas'} de 5
											</span>
										</label>
									{/each}
								</div>
								{#if scores[criterion.key] !== undefined}
									<button
										type="button"
										class="clear"
										aria-label="Quitar la calificación de {criterion.label}"
										onclick={() => clearScore(criterion.key)}
									>
										Quitar
									</button>
								{/if}
							</div>
						</fieldset>
					{/each}
				</fieldset>

				{#if errorMessage}
					<p class="error" role="alert">{errorMessage}</p>
				{/if}

				<Button type="submit" disabled={!formEnabled || !hasScore}>
					{status === 'sending' ? 'Enviando…' : 'Enviar calificación'}
				</Button>
			</form>
		{/if}
	</div>
</section>

<style>
	h2 {
		margin-bottom: 12px;
		font-size: 20px;
	}

	h3 {
		margin-bottom: 8px;
		font-size: 16px;
		font-weight: 500;
	}

	.intro {
		margin-bottom: 16px;
		font-size: 16px;
	}

	.intro,
	.muted,
	.hint {
		color: var(--ink-soft);
	}

	.hint {
		font-size: 14px;
	}

	.avg-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 12px;
		padding-bottom: 10px;
		border-bottom: 1px solid var(--rule);
		font-size: 15px;
	}

	.avg-head strong {
		font-weight: 500;
	}

	.average {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		gap: 4px 16px;
		padding: 10px 0;
	}

	.average + .average {
		border-top: 1px solid var(--rule);
	}

	.average dt {
		font-size: 15px;
	}

	.average dd {
		display: flex;
		align-items: center;
		gap: 10px;
		white-space: nowrap;
	}

	.number {
		min-width: 4.2em;
		font-size: 15px;
		font-weight: 500;
		text-align: right;
	}

	.stars,
	.radios {
		display: inline-flex;
		gap: 2px;
		--star-size: 16px;
	}

	.form-block {
		margin-top: 20px;
		padding-top: 16px;
		border-top: 1px solid var(--rule);
	}

	.notice,
	.thanks {
		margin-bottom: 14px;
		padding: 12px 16px;
		border-radius: var(--radius-sm);
		background: var(--tint);
		font-size: 16px;
	}

	.thanks {
		display: grid;
		gap: 12px;
		justify-items: start;
		margin-bottom: 0;
	}

	form {
		display: grid;
		gap: 20px;
	}

	fieldset {
		min-width: 0;
		margin: 0;
		padding: 0;
		border: 0;
	}

	.criterion {
		padding: 10px 0;
	}

	.criterion + .criterion {
		box-shadow: 0 -1px 0 var(--rule);
	}

	.criteria .hint {
		margin-bottom: 4px;
	}

	.criterion legend {
		float: left;
		width: 100%;
		padding: 0;
		margin-bottom: 4px;
		font-size: 15px;
		font-weight: 500;
	}

	.options {
		clear: both;
		margin-left: -8px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
	}

	.radios {
		--star-size: 28px;
	}

	.radios {
		gap: 0;
	}

	.radios label {
		display: inline-grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: background-color 120ms ease;
	}

	.radios label:hover {
		background: var(--guinda-tint);
	}

	.radios input:focus-visible + label {
		outline: 2px solid var(--guinda);
		outline-offset: 2px;
	}

	fieldset:disabled .radios label {
		cursor: not-allowed;
		opacity: 0.55;
	}

	fieldset:disabled .radios label:hover {
		background: transparent;
	}

	.clear {
		min-height: 44px;
		padding: 0 8px;
		border: 0;
		background: none;
		color: var(--guinda);
		font: inherit;
		font-size: 15px;
		font-weight: 500;
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-thickness: 1px;
		cursor: pointer;
	}

	.load-error {
		display: grid;
		gap: 12px;
		justify-items: start;
		padding: 12px 16px;
		border: 1px solid var(--guinda);
		border-radius: var(--radius-sm);
		background: var(--guinda-tint);
		color: var(--guinda);
		font-weight: 500;
	}

	.error {
		padding: 12px 16px;
		border: 1px solid var(--guinda);
		border-radius: var(--radius-sm);
		background: var(--guinda-tint);
		color: var(--guinda);
		font-weight: 500;
	}
</style>
