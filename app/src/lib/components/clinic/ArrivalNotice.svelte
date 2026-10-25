<script lang="ts">
	let {
		phoneSource = 'de esta ficha',
		level = 3
	}: { phoneSource?: string; level?: 2 | 3 | 4 } = $props();

	const uid = $props.id();
	const titleId = `${uid}-title`;
</script>

<aside class="notice" aria-labelledby={titleId}>
	<svelte:element this={`h${level}`} id={titleId} class="title">Orientación al llegar</svelte:element>
	<p class="body">
		Afuera de algunas unidades que ofrecen ILE se han reportado módulos, camionetas o personas
		ajenas a la Secretaría de Salud que dan información falsa o dicen que el servicio está cerrado;
		la atención de ILE se brinda dentro de la unidad, con su personal. Puedes entrar y preguntar ahí
		por el servicio; si tienes dudas, llama al teléfono {phoneSource}.
	</p>
</aside>

<style>
	.notice {
		padding: 12px 16px;
		border: 1px solid var(--rule);
		border-radius: var(--radius-sm);
		background: var(--tint);
	}

	.title {
		margin: 0 0 4px;
		font-size: 16px;
		font-weight: 500;
		line-height: 1.3;
	}

	.body {
		max-width: var(--measure);
		font-size: 15px;
		color: var(--ink-soft);
	}
</style>
