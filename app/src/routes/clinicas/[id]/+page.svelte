<script lang="ts">
	import RatingSection from '#lib/components/rating/RatingSection.svelte';
	import ArrivalNotice from '#lib/components/clinic/ArrivalNotice.svelte';
	import ClinicTrip from '#lib/components/clinic/ClinicTrip.svelte';
	import VerificationBadge from '#lib/components/clinic/VerificationBadge.svelte';
	import { KIND_LABELS } from '#lib/components/clinic/labels.ts';
	import { isClinicVerified } from '#lib/data/verification.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const clinic = $derived(data.clinic);
	const title = $derived(`${clinic.name} · RUTA LIBRE`);
	const verified = $derived(isClinicVerified(clinic));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={data.description} />
	<link rel="canonical" href={data.canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="es_MX" />
	<meta property="og:site_name" content="RUTA LIBRE" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={data.description} />
	<meta property="og:url" content={data.canonical} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={data.description} />
</svelte:head>

<main id="main">
	<p class="crumbs"><a href="/clinicas">Volver a la lista</a></p>

	<header class="clinic-head">
		<h1>{clinic.name}</h1>
		<p class="where">
			<VerificationBadge {clinic} />
			<span>{clinic.borough}</span>
			<span>{KIND_LABELS[clinic.kind]}</span>
		</p>
		{#if !verified}
			<p class="warn">
				Copiamos estos datos de la fuente pública y todavía no los confirmamos con la unidad. Antes
				de ir, llama o revisa la fuente.
			</p>
		{/if}
	</header>

	<div class="clinic-body">
		<div class="clinic-main">
			<section class="block b-facts" aria-labelledby="facts-title">
				<h2 id="facts-title" class="visually-hidden">Datos de la clínica</h2>
				<dl class="facts">
					<div>
						<dt>Dirección</dt>
						<dd>{clinic.address}</dd>
					</div>
					<div>
						<dt>Horario</dt>
						<dd>{clinic.hours}</dd>
					</div>
					<div>
						<dt>Teléfono</dt>
						<dd>{clinic.phone ?? 'No disponible en la fuente'}</dd>
					</div>
					<div>
						<dt>Fuente</dt>
						<dd>
							<a href={clinic.sourceUrl} rel="noopener noreferrer" target="_blank"
								>{clinic.sourceName}</a
							>
						</dd>
					</div>
				</dl>
			</section>

			<div class="block b-notice">
				<ArrivalNotice level={2} />
			</div>

			<section class="block b-req" aria-labelledby="requirements-title">
				<h2 id="requirements-title">Requisitos</h2>
				{#if clinic.requirements.length > 0}
					<ul class="ruled">
						{#each clinic.requirements as requirement, index (index)}
							<li>{requirement}</li>
						{/each}
					</ul>
				{:else}
					<p>La fuente no indica requisitos. Confírmalos con la clínica antes de ir.</p>
				{/if}
			</section>

			<section class="block b-serv" aria-labelledby="services-title">
				<h2 id="services-title">Servicios</h2>
				{#if clinic.services.length > 0}
					<ul class="ruled">
						{#each clinic.services as service, index (index)}
							<li>{service}</li>
						{/each}
					</ul>
				{:else}
					<p>La fuente no indica servicios. Confírmalos con la clínica antes de ir.</p>
				{/if}
			</section>
		</div>

		<div class="clinic-side">
			<section class="block b-howto" aria-labelledby="route-title">
				<h2 id="route-title">Cómo llegar</h2>
				<ClinicTrip {clinic} groups={data.stationGroups} stations={data.stations} />
			</section>

			<div class="block b-rate">
				<RatingSection clinicId={clinic.id} />
			</div>
		</div>
	</div>

	<nav class="pager" aria-label="Otras fichas">
		<a class="prev" href="/clinicas/{data.previous.id}" rel="prev">
			<span class="label">← Anterior</span>
			<span class="name">{data.previous.name}</span>
		</a>
		<a class="next" href="/clinicas/{data.next.id}" rel="next">
			<span class="label">Siguiente →</span>
			<span class="name">{data.next.name}</span>
		</a>
	</nav>

	<p class="compare"><a href="/consultar">Comparar con otras clínicas</a></p>

	<p class="doubts"><a href="/preguntar">¿Tienes dudas? Pregunta</a></p>
</main>

<style>
	.crumbs {
		padding: 0 32px;
		border-bottom: 1px solid var(--rule);
		font-size: 15px;
	}

	.crumbs a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}

	.clinic-head {
		padding: 28px 32px 24px;
	}

	h1 {
		max-width: 30ch;
		font-size: 28px;
	}

	.where {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px 12px;
		margin-top: 12px;
		color: var(--ink-soft);
	}

	.warn {
		max-width: 60ch;
		margin-top: 12px;
		font-size: 15px;
		color: var(--ink-soft);
	}

	.clinic-body {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		border-top: 1px solid var(--rule);
	}

	.clinic-main {
		border-right: 1px solid var(--rule);
	}

	.block {
		padding: 24px 32px 28px;
	}

	.block + .block {
		border-top: 1px solid var(--rule);
	}

	.block h2 {
		margin-bottom: 12px;
		font-size: 20px;
	}

	.b-notice {
		padding-block: 20px;
	}

	.facts > div {
		display: grid;
		grid-template-columns: 120px minmax(0, 1fr);
		gap: 16px;
		padding: 12px 0;
	}

	.facts > div + div {
		border-top: 1px solid var(--rule);
	}

	.facts > div:first-child {
		padding-top: 0;
	}

	dt {
		font-size: 15px;
		font-weight: 500;
		color: var(--ink-soft);
	}

	dd {
		overflow-wrap: anywhere;
	}

	.ruled li {
		padding: 10px 0;
	}

	.ruled li + li {
		border-top: 1px solid var(--rule);
	}

	.ruled li:first-child {
		padding-top: 0;
	}

	.pager {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		border-top: 1px solid var(--rule);
	}

	.pager a {
		display: grid;
		gap: 2px;
		min-width: 0;
		overflow-wrap: anywhere;
		padding: 18px 32px;
		color: var(--ink);
		text-decoration: none;
	}

	.pager a {
		transition: background-color 120ms ease;
	}

	.pager a:hover {
		background: var(--guinda-tint);
	}

	.pager a:focus-visible {
		outline-offset: -2px;
	}

	.pager .next {
		border-left: 1px solid var(--rule);
		text-align: right;
	}

	.label {
		font-size: 14px;
		color: var(--ink-soft);
	}

	.name {
		font-weight: 500;
	}

	.compare {
		padding: 4px 32px;
		border-top: 1px solid var(--rule);
		font-weight: 500;
	}

	.compare a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}

	.doubts {
		padding: 0 32px 8px;
		font-size: 15px;
	}

	.doubts a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}

	@media (max-width: 899px) {
		.crumbs {
			padding: 0 16px;
		}

		.clinic-head {
			padding: 22px 16px 20px;
		}

		h1 {
			font-size: 23px;
		}

		.clinic-body {
			display: flex;
			flex-direction: column;
		}

		.clinic-main,
		.clinic-side {
			display: contents;
		}

		.block {
			padding: 20px 16px 24px;
		}

		.b-facts {
			order: 1;
		}

		.b-howto {
			order: 2;
		}

		.b-notice {
			order: 3;
			padding: 16px;
		}

		.b-req {
			order: 4;
		}

		.b-serv {
			order: 5;
		}

		.b-rate {
			order: 6;
		}

		.b-howto,
		.b-notice,
		.b-req,
		.b-serv,
		.b-rate {
			border-top: 1px solid var(--rule);
		}

		.facts > div {
			grid-template-columns: 1fr;
			gap: 2px;
		}

		.pager {
			grid-template-columns: minmax(0, 1fr);
		}

		.pager a {
			padding: 16px;
		}

		.pager .next {
			border-top: 1px solid var(--rule);
			border-left: 0;
			text-align: left;
		}

		.compare {
			padding: 4px 16px;
		}

		.doubts {
			padding: 0 16px 8px;
		}
	}
</style>
