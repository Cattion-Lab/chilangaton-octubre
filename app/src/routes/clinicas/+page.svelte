<script lang="ts">
	import ClinicCard from '#lib/components/clinic/ClinicCard.svelte';
	import { latestVerifiedAt, formatVerificationDate, pendingCount } from '#lib/data/verification.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const title = 'Clínicas · RUTA LIBRE';
	const shareTitle = 'Clínicas y espacios de orientación | RUTA LIBRE';
	const description =
		'Directorio de clínicas ILE públicas y espacios de orientación en la Ciudad de México, con su fuente, su alcaldía y la fecha en que se verificó cada ficha.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={data.canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="es_MX" />
	<meta property="og:site_name" content="RUTA LIBRE" />
	<meta property="og:title" content={shareTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={data.canonical} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={shareTitle} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<main id="main">
	<header class="head">
		<h1>Clínicas</h1>
		<p class="lead">
			Estos son los lugares que incluimos por ahora. Cada ficha indica su fuente y cuándo se
			verificó; si algo aparece como por verificar, llama o revisa la fuente antes de ir.
		</p>
	</header>

	<div class="results-head">
		<strong>{data.clinics.length} clínicas</strong>
		<span class="muted">
			{#if latestVerifiedAt}
				Datos revisados por última vez el
				<time datetime={latestVerifiedAt}>{formatVerificationDate(latestVerifiedAt)}</time>
			{:else}
				Datos en proceso de verificación ({pendingCount} fichas)
			{/if}
		</span>
	</div>

	{#if data.clinics.length > 0}
		<ul class="clinics" aria-label="Clínicas y espacios de orientación">
			{#each data.clinics as clinic (clinic.id)}
				<li><ClinicCard {clinic} /></li>
			{/each}
		</ul>
	{:else}
		<p class="empty">Todavía no hay clínicas en el directorio.</p>
	{/if}
</main>

<style>
	.head {
		padding: 28px 32px 20px;
	}

	h1 {
		font-size: 26px;
	}

	.lead {
		max-width: var(--measure);
		margin-top: 8px;
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

	.results-head strong {
		font-weight: 500;
	}

	.muted {
		color: var(--ink-soft);
	}

	.clinics > li + li {
		border-top: 1px solid var(--rule);
	}

	.empty {
		padding: 28px 32px;
		color: var(--ink-soft);
	}

	@media (max-width: 899px) {
		.head {
			padding: 20px 16px 16px;
		}

		h1 {
			font-size: 23px;
		}

		.results-head {
			padding: 10px 16px;
		}

		.empty {
			padding: 22px 16px;
		}
	}
</style>
