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

	<section class="intro" aria-label="Presentación">
		<p class="lead">
			Tomar decisiones sobre nuestra vida reproductiva debería ser un derecho, no un privilegio
			condicionado por el lugar donde vivimos, el dinero que tenemos o el tiempo del que disponemos.
		</p>
		<p>
			En la Ciudad de México, el acceso a información, servicios de salud sexual y reproductiva y
			redes de apoyo no siempre es igual para todas las personas. Los traslados, los costos, las
			desigualdades sociales y las responsabilidades de cuidado pueden convertirse en barreras para
			ejercer nuestros derechos.
		</p>
		<p>
			Ruta Libre nace para visibilizar estas barreras y explorar cómo construir una ciudad donde
			podamos decidir con mayor libertad, información y autonomía.
		</p>

		<h2>Objetivo</h2>
		<p>
			Explorar soluciones para que las personas puedan ejercer sus derechos sexuales y reproductivos
			con mayor autonomía, mediante el acceso a información clara, la identificación de barreras de
			movilidad y el fortalecimiento de las redes de apoyo y la participación comunitaria.
		</p>
		<p>
			Imaginamos una Ciudad de México donde las condiciones económicas, territoriales y sociales no
			determinen quién puede acceder a información, servicios y oportunidades para decidir sobre su
			futuro.
		</p>

		<h2>Valores</h2>
		<dl class="values">
			<dt>Autonomía</dt>
			<dd>Cada persona debe poder tomar decisiones informadas sobre su cuerpo y su proyecto de vida.</dd>
			<dt>Justicia e igualdad</dt>
			<dd>
				Reconocemos que no todas las personas parten de las mismas condiciones ni enfrentan las
				mismas barreras.
			</dd>
			<dt>Dignidad y derechos</dt>
			<dd>El acceso a información y servicios debe darse sin discriminación, estigmas ni juicios.</dd>
			<dt>Comunidad y corresponsabilidad</dt>
			<dd>
				Las decisiones individuales también necesitan redes de apoyo, cuidados compartidos y
				respuestas colectivas.
			</dd>
			<dt>Accesibilidad</dt>
			<dd>
				El territorio, los tiempos de traslado y las condiciones materiales importan cuando hablamos
				de ejercer derechos.
			</dd>
		</dl>

		<h2>Enfoque</h2>
		<p>
			Ruta Libre parte de una idea central: la posibilidad de decidir no depende únicamente de la
			voluntad individual; también depende de las condiciones sociales que hacen posible esa
			decisión.
		</p>
		<p>Por eso, nuestra investigación conecta cuatro dimensiones:</p>
		<ul class="dimensions">
			<li>
				<strong>Movilidad:</strong> los tiempos, costos y trayectos que pueden facilitar o dificultar
				el acceso a servicios.
			</li>
			<li>
				<strong>Derechos sexuales y reproductivos:</strong> la posibilidad de acceder a información y
				atención para tomar decisiones libres e informadas.
			</li>
			<li>
				<strong>Cuidados:</strong> las responsabilidades que ocupan tiempo, limitan desplazamientos y
				suelen distribuirse de manera desigual, especialmente entre las mujeres.
			</li>
			<li>
				<strong>Participación comunitaria:</strong> la importancia de escuchar a las personas que
				enfrentan estas barreras e incluir sus experiencias en el diseño de soluciones.
			</li>
		</ul>
		<p>
			Nuestra propuesta combina la investigación social con la construcción de escenarios de
			futuro. Partimos del análisis de las desigualdades que atraviesan la movilidad, los cuidados y
			el acceso a derechos para plantear preguntas sobre la ciudad que habitamos y la que queremos
			construir.
		</p>
		<p>
			La investigación busca conectar información, experiencias y posibles soluciones. Escuchar a
			las personas afectadas por estas barreras es fundamental para que las propuestas no se diseñen
			desde supuestos, sino a partir de las necesidades y condiciones reales de la población.
		</p>
	</section>

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

	.intro {
		max-width: var(--measure);
		margin-top: 20px;
		line-height: 1.6;
	}

	.intro p + p {
		margin-top: 12px;
	}

	.intro .lead {
		font-size: 19px;
		line-height: 1.5;
	}

	.intro h2 {
		margin: 28px 0 10px;
	}

	.values dt {
		margin-top: 14px;
		font-weight: 500;
	}

	.values dt:first-child {
		margin-top: 0;
	}

	.values dd {
		margin-top: 2px;
		color: var(--ink-soft);
	}

	.dimensions {
		margin: 12px 0;
		padding-left: 20px;
		list-style: disc;
	}

	.dimensions li + li {
		margin-top: 8px;
	}

	.docs {
		margin-top: 36px;
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
