<script lang="ts">
	import PageMeta from '#lib/components/ui/PageMeta.svelte';
	import ChoiceGroup from '#lib/components/consult/ChoiceGroup.svelte';
	import { acceptConsent, revokeConsent } from '#lib/components/consult/consent-actions.ts';

	const notCollected = [
		'Tu nombre, tu CURP o cualquier dato que te identifique.',
		'Cuentas, registros o inicios de sesión.',
		'Tu ubicación: nunca se la pedimos al navegador.',
		'Búsquedas guardadas ni historial de las clínicas que consultas.',
		'Cookies de rastreo ni herramientas de analítica.'
	];

	const thirdParties = [
		{
			title: 'Google Maps, el mapa',
			text: 'Al cargar el mapa, Google recibe datos técnicos de tu navegador, como la dirección IP, y la dirección de la página de donde viene la petición, con lo que puede saber que visitaste RUTA LIBRE. Solo se carga después de que aceptas este aviso; mientras no lo aceptes, tu navegador no le hace ninguna petición a Google.'
		},
		{
			title: 'Google Routes, el cálculo de trayectos',
			text: 'Los trayectos los calcula nuestro servidor con Google. En ese paso Google ve a nuestro servidor, no a ti. Tu estación y la clínica viajan dentro de la petición y no quedan en la dirección de la página.'
		},
		{
			title: 'Vercel, donde se aloja el sitio',
			text: 'Puede registrar accesos técnicos durante un tiempo limitado. No usamos esos registros para identificar a nadie.'
		},
		{
			title: 'Tu proveedor de internet',
			text: 'Tu proveedor, o la red del lugar donde te conectas, puede ver que visitaste este sitio, pero no lo que haces dentro.'
		}
	];

	const tips = [
		'Abre el sitio en una ventana privada o de incógnito, que no guarda historial en tu dispositivo.',
		'Si no quieres que tu proveedor de internet vea qué sitio visitas, puedes usar una VPN de confianza.',
		'El botón «Salida rápida», o Esc dos veces, te saca de inmediato, borra lo que guardamos en la pestaña y reemplaza esta página en la pestaña; para no dejar rastro en el historial, usa una ventana privada.',
		'Cierra la pestaña al terminar; tu decisión sobre este aviso solo dura mientras siga abierta.'
	];
</script>

<PageMeta
	title="Privacidad | RUTA LIBRE"
	description="Aviso de privacidad simplificado de RUTA LIBRE: qué no recolectamos, qué pueden ver terceros como Google y cómo reducir tu rastro al consultar."
/>

<main id="main" class="privacy">
	<aside class="toc">
		<nav aria-label="En este aviso">
			<p>En este aviso</p>
			<ol>
				<li><a href="#no-recolectamos">Lo que no recolectamos</a></li>
				<li><a href="#terceros">Lo que pueden ver otras empresas</a></li>
				<li><a href="#calificaciones">Calificaciones</a></li>
				<li><a href="#chat">Preguntas en el chat</a></li>
				<li><a href="#rastro">Cómo reducir tu rastro</a></li>
				<li><a href="#decision">Tu decisión</a></li>
			</ol>
		</nav>
	</aside>

	<article class="reading">
		<h1>Aviso de privacidad</h1>
		<p class="lead">
			RUTA LIBRE está hecho para que consultes sin dejar datos personales. Aquí explicamos qué
			guardamos, qué pueden ver otras empresas y qué puedes hacer para cuidarte más.
		</p>
		<p class="owner">Responsable: Cattion (<a href="mailto:hola@cattion.com">hola@cattion.com</a>)</p>
		<p class="note">
			Es un aviso simplificado de un prototipo. No promete riesgo cero ni anonimato total; ningún
			sitio de internet puede hacerlo.
		</p>

		<section id="no-recolectamos" aria-labelledby="no-recolectamos-title">
			<h2 id="no-recolectamos-title">Lo que no recolectamos</h2>
			<ul>
				{#each notCollected as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
			<p>
				La estación que eliges no se guarda: viaja solo en la petición para calcular el trayecto y no
				queda en la dirección de la página.
			</p>
		</section>

		<section id="terceros" aria-labelledby="terceros-title">
			<h2 id="terceros-title">Lo que pueden ver otras empresas</h2>
			<dl class="third">
				{#each thirdParties as item (item.title)}
					<div>
						<dt>{item.title}</dt>
						<dd>{item.text}</dd>
					</div>
				{/each}
			</dl>
		</section>

		<section id="calificaciones" aria-labelledby="calificaciones-title">
			<h2 id="calificaciones-title">Calificaciones</h2>
			<p>
				Calificar una clínica es opcional; si decides hacerlo, primero tienes que aceptar este aviso
				de privacidad. Puedes calificarla con estrellas por criterio.
			</p>
			<ul>
				<li>Guardamos únicamente las estrellas de los criterios que elegiste y la semana del año.</li>
				<li>
					No guardamos tu nombre, dirección IP ni la hora de la calificación; además, no hay un campo
					para escribir comentarios.
				</li>
				<li>
					Las calificaciones se almacenan en Supabase, una base de datos alojada en Estados Unidos.
				</li>
				<li>
					Para reducir la posibilidad de exponer a alguien, los promedios se muestran solo cuando hay
					al menos cinco calificaciones.
				</li>
			</ul>
			<p class="note">
				Responsable: Cattion. Para dudas sobre este aviso o para pedir acceso, rectificación,
				cancelación u oposición sobre tus datos, escribe a
				<a href="mailto:hola@cattion.com">hola@cattion.com</a>.
			</p>
		</section>

		<section id="chat" aria-labelledby="chat-title">
			<h2 id="chat-title">Preguntas en el chat</h2>
			<p>
				En «Preguntar» puedes escribir dudas sobre las clínicas o sobre cómo usar el sitio; una IA
				responde con los datos de RUTA LIBRE. Aquí te contamos cómo se procesa la conversación.
			</p>
			<ul>
				<li>El chat se procesa con Anthropic, una empresa en Estados Unidos. La IA responde con los datos del sitio.</li>
				<li>
					RUTA LIBRE no guarda las conversaciones. No se almacenan en una base de datos ni en los
					registros del servidor.
				</li>
				<li>
					El historial permanece solo en la página abierta. Se borra al cerrar la pestaña, recargarla o
					usar «Salida rápida».
				</li>
				<li>
					Anthropic puede conservar las conversaciones durante un tiempo. La duración depende de su
					propia política.
				</li>
				<li>
					No escribas datos que te identifiquen. Por ejemplo, evita incluir tu nombre, teléfono,
					dirección o CURP.
				</li>
				<li>
					El chat solo funciona si aceptas este aviso de privacidad. Mientras no lo aceptes, no se envía
					nada.
				</li>
			</ul>
		</section>

		<section id="rastro" aria-labelledby="rastro-title">
			<h2 id="rastro-title">Cómo reducir tu rastro</h2>
			<ul>
				{#each tips as tip (tip)}
					<li>{tip}</li>
				{/each}
			</ul>
			<p>
				Ninguna de estas medidas borra el rastro por completo; reducen lo que otras personas o
				empresas podrían ver.
			</p>
		</section>

		<section id="decision" aria-labelledby="decision-title">
			<h2 id="decision-title">Tu decisión</h2>
			<div class="when-no">
				<p>
					Si aceptas, el mapa de Consultar se carga solo y podrás calcular trayectos. La decisión
					solo se recuerda en esta pestaña y se borra al cerrarla; puedes retirarla cuando quieras.
					Al aceptar este aviso, también habilitas el chat «Preguntar».
				</p>
				<ChoiceGroup>
					<button type="button" class="choice primary" onclick={acceptConsent}>Aceptar</button>
					<a class="choice" href="/consultar">Ir a consultar</a>
				</ChoiceGroup>
			</div>
			<div class="when-yes">
				<p><span class="chip">Aviso aceptado en esta pestaña</span></p>
				<p>
					Ya aceptaste este aviso, así que el mapa de Consultar se carga solo. Si cierras la pestaña,
					esta decisión se borra; también puedes retirarla cuando quieras. Con esta aceptación,
					también queda habilitado el chat «Preguntar».
				</p>
				<ChoiceGroup>
					<a class="choice primary" href="/consultar">Ir a consultar</a>
					<button type="button" class="choice" onclick={revokeConsent}>Retirar aceptación</button>
				</ChoiceGroup>
			</div>
		</section>
	</article>
</main>

<style>
	.privacy {
		display: grid;
		grid-template-columns: 260px minmax(0, 1fr);
	}

	.toc {
		border-right: 1px solid var(--rule);
	}

	.toc nav {
		position: sticky;
		top: var(--header-h);
		padding: 28px 24px;
	}

	.toc p {
		margin-bottom: 8px;
		font-size: 14px;
		font-weight: 500;
		color: var(--ink-soft);
	}

	.toc li + li {
		border-top: 1px solid var(--rule);
	}

	.toc a {
		display: flex;
		align-items: center;
		min-height: 44px;
		padding: 4px 0;
		font-size: 15px;
		color: var(--ink);
		text-decoration: none;
	}

	.toc a:hover {
		color: var(--guinda);
	}

	.reading {
		padding: 36px 48px 48px;
	}

	.reading > * {
		max-width: var(--measure);
	}

	h1 {
		font-size: 30px;
	}

	.lead {
		margin-top: 14px;
		font-size: 19px;
		line-height: 1.55;
	}

	.owner {
		margin-top: 12px;
		font-size: 16px;
		color: var(--ink-soft);
	}

	.owner a,
	.note a {
		color: var(--guinda);
		text-underline-offset: 3px;
	}

	.note {
		margin-top: 16px;
		padding: 12px 16px;
		border-radius: var(--radius-sm);
		background: var(--tint);
		font-size: 16px;
	}

	section {
		margin-top: 36px;
		padding-top: 28px;
		border-top: 1px solid var(--rule);
		scroll-margin-top: 8px;
	}

	h2 {
		margin-bottom: 14px;
		font-size: 22px;
	}

	p + p,
	ul + p {
		margin-top: 12px;
	}

	ul {
		padding-left: 1.2em;
		list-style: disc;
	}

	li + li {
		margin-top: 8px;
	}

	li::marker {
		color: var(--guinda);
	}

	.third {
		padding: 0;
	}

	.third > div {
		padding: 14px 0;
	}

	.third > div + div {
		border-top: 1px solid var(--rule);
	}

	.third > div:first-child {
		padding-top: 0;
	}

	dt {
		font-weight: 500;
	}

	dd {
		margin: 4px 0 0;
	}

	.chip {
		display: inline-flex;
		padding: 2px 8px;
		border-radius: 4px;
		background: var(--tint);
		font-size: 14px;
		font-weight: 500;
		line-height: 1.5;
	}

	.when-yes {
		display: none;
	}

	.when-no :global(.group),
	.when-yes :global(.group) {
		margin-top: 16px;
	}

	:global(html[data-consent='yes']) .when-no {
		display: none;
	}

	:global(html[data-consent='yes']) .when-yes {
		display: block;
	}

	@media (max-width: 899px) {
		.privacy {
			grid-template-columns: 1fr;
		}

		.toc {
			display: none;
		}

		.reading {
			padding: 24px 16px 36px;
		}

		h1 {
			font-size: 25px;
		}

		.lead {
			font-size: 18px;
		}

		section {
			margin-top: 28px;
			padding-top: 22px;
		}

		h2 {
			font-size: 20px;
		}
	}
</style>
