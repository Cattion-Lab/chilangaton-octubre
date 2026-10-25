<script lang="ts">
	import { formatVerificationDate, latestVerifiedAt, pendingCount } from '#lib/data/verification.ts';
</script>

<footer class="foot">
	<p>
		RUTA LIBRE es una línea de investigación sobre movilidad reproductiva en la Ciudad de México.
		Chilangatón 2026, Laboratorio de Futuros.
	</p>
	<p>
		No sustituye la orientación de profesionales de la salud ni la información oficial de cada
		clínica.
	</p>
	<p>
		{#if latestVerifiedAt}
			Datos revisados por última vez el
			<time datetime={latestVerifiedAt}>{formatVerificationDate(latestVerifiedAt)}</time>.
		{:else}
			Datos en proceso de verificación ({pendingCount} fichas).
		{/if}
	</p>
	<ul>
		<li><a href="/consultar">Consultar clínica</a></li>
		<li><a href="/datos">Datos y fuentes</a></li>
		<li><a href="/fundamentos">Fundamentos</a></li>
		<li><a href="/privacidad">Aviso de privacidad</a></li>
	</ul>
</footer>

<style>
	.foot {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px 24px 40px;
		font-size: 15px;
		color: var(--ink-soft);
	}

	.foot p + p {
		margin-top: 4px;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0 20px;
		margin-top: 8px;
	}

	a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}

	@media (max-width: 899px) {
		.foot {
			padding: 18px 16px 32px;
		}
	}
</style>
