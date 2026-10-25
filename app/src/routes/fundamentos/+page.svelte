<script lang="ts">
	import PageMeta from '#lib/components/ui/PageMeta.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PageMeta
	title="Fundamentos | RUTA LIBRE"
	description="Documentos de investigación del equipo de RUTA LIBRE en el Chilangatón: recopilación, fuerzas motoras, fuentes oficiales y bases del reto."
	ogTitle="Fundamentos e investigación | RUTA LIBRE"
/>

<main id="main" class="foundations">
	<h1>Fundamentos e investigación</h1>

	<ul class="docs">
		{#each data.documents as document (document.slug)}
			<li>
				<h2><a href="/fundamentos/{document.slug}">{document.title}</a></h2>
				{#if document.summary}
					<p>{document.summary}</p>
				{/if}
			</li>
		{/each}
		<li>
			<h2>
				<a href="/CHILANGATON-EXT.pdf" download>«Presentación de los retos» (PDF, 8 páginas)</a>
			</h2>
			<p>Contiene las bases del hackatón y del Laboratorio de Futuros.</p>
		</li>
	</ul>
</main>

<style>
	.foundations {
		padding: 36px 48px 48px;
	}

	h1 {
		font-size: 30px;
	}

	.docs {
		margin-top: 28px;
		max-width: var(--measure);
	}

	.docs li {
		padding: 22px 0;
		border-top: 1px solid var(--rule);
	}

	.docs li:last-child {
		border-bottom: 1px solid var(--rule);
	}

	h2 {
		font-size: 21px;
		line-height: 1.3;
	}

	h2 a {
		display: inline-block;
		padding: 4px 0;
		color: var(--guinda);
		text-underline-offset: 3px;
	}

	.docs p {
		margin-top: 6px;
		color: var(--ink-soft);
		line-height: 1.55;
	}

	@media (max-width: 899px) {
		.foundations {
			padding: 24px 16px 36px;
		}

		h1 {
			font-size: 25px;
		}

		h2 {
			font-size: 19px;
		}
	}
</style>
