<script lang="ts">
	import PageMeta from '#lib/components/ui/PageMeta.svelte';
	import { clinics } from '#lib/data/clinics.ts';

	const sections = [
		{
			href: '/consultar',
			title: 'Consultar cómo llegar',
			text: 'Elige una estación de partida, o ninguna, y compara trayectos a cada clínica.'
		},
		{
			href: '/clinicas',
			title: 'Clínicas',
			text: `Dirección, horario, requisitos y servicios de las ${clinics.length} unidades.`
		},
		{
			href: '/datos',
			title: 'Datos y fuentes',
			text: 'De dónde viene la información y qué falta confirmar.'
		},
		{
			href: '/privacidad',
			title: 'Privacidad',
			text: 'Qué no recolectamos y qué pueden ver otras empresas.'
		}
	];
</script>

<PageMeta
	title="RUTA LIBRE · Movilidad para decidir"
	ogTitle="RUTA LIBRE | Compara cómo llegar a servicios de aborto en la CDMX"
	description="Compara tiempo, transbordos y horarios para llegar en transporte público a clínicas ILE y espacios de orientación en la Ciudad de México, sin dar tu ubicación ni tus datos."
/>

<main id="main" class="home">
	<div class="intro">
		<h1>Cómo llegar a un servicio de aborto en la Ciudad de México</h1>
		<p class="lead">
			Aquí puedes comparar cómo llegar en transporte público a las unidades de la Secretaría de
			Salud que ofrecen la Interrupción Legal del Embarazo (ILE).
		</p>
		<p>
			Ves el tiempo de cada trayecto, los transbordos y lo que se camina. Tú decides desde dónde
			partir, si quieres decirlo. La información de las clínicas viene de una fuente pública y aún
			la estamos verificando, así que conviene confirmar horario y requisitos antes de ir.
		</p>
	</div>

	<nav class="index-nav" aria-label="Secciones de RUTA LIBRE">
		<ul class="index">
			{#each sections as section (section.href)}
				<li>
					<a href={section.href}>
						<strong>{section.title}</strong>
						<span>{section.text}</span>
						<svg viewBox="0 0 20 20" aria-hidden="true">
							<path
								d="M7 4l6 6-6 6"
								fill="none"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</main>

<style>
	.home {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
	}

	.intro {
		padding: 36px 40px 40px 32px;
	}

	h1 {
		max-width: 22ch;
		font-size: 30px;
	}

	.lead {
		max-width: 52ch;
		margin-top: 16px;
		font-size: 19px;
		line-height: 1.5;
	}

	.lead + p {
		max-width: 52ch;
		margin-top: 14px;
	}

	.index-nav {
		border-left: 1px solid var(--rule);
	}

	.index li + li {
		border-top: 1px solid var(--rule);
	}

	.index a {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 2px 16px;
		align-items: center;
		padding: 20px 28px;
		color: var(--ink);
		text-decoration: none;
		transition: background-color 120ms ease;
	}

	.index a:hover {
		background: var(--guinda-tint);
	}

	.index a:focus-visible {
		outline-offset: -2px;
	}

	.index strong {
		font-weight: 500;
		font-size: 19px;
		color: var(--guinda);
	}

	.index span {
		grid-column: 1;
		font-size: 16px;
		color: var(--ink-soft);
	}

	.index svg {
		grid-column: 2;
		grid-row: 1 / span 2;
		width: 20px;
		height: 20px;
		color: var(--guinda);
	}

	@media (max-width: 899px) {
		.home {
			grid-template-columns: minmax(0, 1fr);
		}

		.intro {
			padding: 26px 16px 28px;
		}

		h1 {
			font-size: 25px;
		}

		.lead {
			font-size: 18px;
		}

		.index-nav {
			border-left: 0;
			border-top: 1px solid var(--rule);
		}

		.index a {
			padding: 16px;
		}

		.index strong {
			font-size: 18px;
		}
	}
</style>
