<script lang="ts">
	import PageMeta from '#lib/components/ui/PageMeta.svelte';
	import { clinics } from '#lib/data/clinics.ts';
	import Pill from '#lib/components/ui/Pill.svelte';
	import Section from '#lib/components/ui/Section.svelte';

	const sources = [
		{
			name: 'Secretaría de Salud CDMX: directorio de unidades ILE',
			url: 'https://ile.salud.cdmx.gob.mx/directorio-clinicas-interrupcion-legal-del-embarazo/',
			use: 'Clínicas públicas de interrupción legal del embarazo.'
		},
		{
			name: 'Portal de Datos Abiertos CDMX: GTFS de transporte',
			url: 'https://datos.cdmx.gob.mx/dataset/gtfs',
			use: 'Estaciones y líneas del transporte público.'
		},
		{
			name: 'GIRE: Directorio de Servicios de Aborto Seguro',
			url: 'https://abortomexico.gire.org.mx/directorio-de-servicios-de-aborto-seguro/',
			use: 'Espacios de orientación y organizaciones.'
		},
		{
			name: 'SEDESA: advertencia sobre servicios falsos de ILE',
			url: 'https://www.salud.cdmx.gob.mx/boletines/27abr2024-llama-sedesa-denunciar-servicios-falsos-de-ile-en-ciudad-de-mexico',
			use: 'Aviso para identificar y denunciar servicios falsos.'
		}
	];

	const dateFormat = new Intl.DateTimeFormat('es-MX', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});

	function formatDate(value: string): string {
		return dateFormat.format(new Date(value));
	}
</script>

<PageMeta
	title="Datos y fuentes · RUTA LIBRE"
	description="Fuentes, método de cálculo y estado de verificación de cada clínica y espacio de orientación que muestra RUTA LIBRE."
/>

<main id="main" class="reading">
	<h1>Datos y fuentes</h1>
	<p class="lead">
		Aquí está de dónde sale la información, cómo calculamos los trayectos y qué tan verificada está
		cada clínica.
	</p>

	<Section id="sources" title="Fuentes iniciales">
		<ul class="sources">
			{#each sources as source (source.url)}
				<li>
					<a href={source.url} rel="noreferrer noopener" target="_blank">{source.name}</a>
					<span>{source.use}</span>
				</li>
			{/each}
		</ul>
	</Section>

	<Section id="method" title="Cómo calculamos">
		<p>
			Las rutas en transporte público se calculan con Google Routes desde estaciones de referencia
			hasta cada clínica. Los tiempos y los transbordos son estimaciones y pueden cambiar por el
			horario, el tráfico o interrupciones del servicio.
		</p>
		<p>
			Antes de salir, confirma el horario y los requisitos directamente con la clínica a través de
			su fuente oficial.
		</p>
	</Section>

	<Section id="clinics" title="Clínicas y su estado de verificación" wide>
		<div class="table-wrap">
			<table>
				<caption class="visually-hidden">
					Clínicas y espacios de orientación incluidos, con su fuente y estado de verificación
				</caption>
				<thead>
					<tr>
						<th scope="col">Nombre</th>
						<th scope="col">Alcaldía</th>
						<th scope="col">Fuente</th>
						<th scope="col">Verificación</th>
					</tr>
				</thead>
				<tbody>
					{#each clinics as clinic (clinic.id)}
						<tr>
							<th scope="row">{clinic.name}</th>
							<td data-label="Alcaldía">{clinic.borough}</td>
							<td data-label="Fuente">
								<a href={clinic.sourceUrl} rel="noreferrer noopener" target="_blank"
									>{clinic.sourceName}</a
								>
							</td>
							<td data-label="Verificación">
								{#if clinic.verificationStatus === 'verificada' && clinic.verifiedAt}
									<Pill tone="verified">Verificada</Pill>
									<time datetime={clinic.verifiedAt}>{formatDate(clinic.verifiedAt)}</time>
								{:else}
									<Pill tone="pending">Por verificar</Pill>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Section>

	<Section id="next" title="Lo que viene">
		<p>
			Queremos mostrar indicadores territoriales agregados: tiempo medio de traslado, transbordos
			mínimos y compatibilidad de horarios por zona de la ciudad. Se calcularían a partir de
			estaciones de referencia, sin registrar recorridos individuales.
		</p>
	</Section>
</main>

<style>
	.reading {
		padding: 36px 48px 48px;
	}

	h1 {
		max-width: var(--measure);
		font-size: 30px;
	}

	.lead {
		max-width: var(--measure);
		margin-top: 14px;
		font-size: 19px;
		line-height: 1.55;
	}

	.sources li {
		display: grid;
		justify-items: start;
		gap: 0;
		padding: 0 0 10px;
	}

	.sources li + li {
		padding-top: 0;
	}

	.sources li:last-child {
		padding-bottom: 0;
	}

	.sources li + li {
		border-top: 1px solid var(--rule);
	}

	.sources a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		font-weight: 500;
	}

	.sources span {
		color: var(--ink-soft);
		font-size: 15px;
	}

	.table-wrap {
		border: 1px solid var(--rule);
		border-radius: var(--radius);
		background: var(--white);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 15px;
	}

	th,
	td {
		padding: 12px 16px;
		text-align: left;
		vertical-align: top;
		border-bottom: 1px solid var(--rule);
	}

	thead th {
		background: var(--tint);
		font-size: 14px;
		font-weight: 500;
		color: var(--ink-soft);
	}

	thead th:first-child {
		border-top-left-radius: var(--radius);
	}

	thead th:last-child {
		border-top-right-radius: var(--radius);
	}

	tbody th {
		font-weight: 500;
	}

	tbody tr:last-child th,
	tbody tr:last-child td {
		border-bottom: 0;
	}

	td time {
		display: block;
		margin-top: 4px;
		font-size: 14px;
		color: var(--ink-soft);
	}

	@media (max-width: 899px) {
		.reading {
			padding: 24px 16px 36px;
		}

		h1 {
			font-size: 25px;
		}

		.lead {
			font-size: 18px;
		}
	}

	@media (max-width: 40rem) {
		thead {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
		}

		table,
		tbody,
		tr,
		th,
		td {
			display: block;
		}

		tbody tr {
			padding: 8px 0;
			border-bottom: 1px solid var(--rule);
		}

		tbody tr:last-child {
			border-bottom: 0;
		}

		th,
		td {
			border-bottom: 0;
			padding: 4px 16px;
		}

		td::before {
			content: attr(data-label);
			display: block;
			font-size: 14px;
			color: var(--ink-soft);
		}
	}
</style>
