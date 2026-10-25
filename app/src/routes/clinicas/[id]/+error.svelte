<script lang="ts">
	import { page } from '$app/state';
	import Button from '#lib/components/ui/Button.svelte';

	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{notFound ? 'Ficha no encontrada' : 'Algo salió mal'} · RUTA LIBRE</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main id="main" class="missing">
	<h1>{notFound ? 'No existe esa ficha' : 'No pudimos mostrar la ficha'}</h1>
	<p>
		{notFound
			? 'La dirección no corresponde a ninguna clínica de nuestro directorio. Puede que esté mal escrita.'
			: 'Inténtalo de nuevo en unos minutos.'}
	</p>
	<div>
		<Button href="/clinicas">Ver todas las clínicas</Button>
	</div>
</main>

<style>
	.missing {
		display: grid;
		justify-items: start;
		gap: 16px;
		padding: 28px 32px 36px;
	}

	h1 {
		font-size: 26px;
	}

	p {
		max-width: var(--measure);
	}

	@media (max-width: 899px) {
		.missing {
			padding: 22px 16px 28px;
		}

		h1 {
			font-size: 23px;
		}
	}
</style>
