<script lang="ts">
	import PageMeta from '#lib/components/ui/PageMeta.svelte';
	import DocumentReader from '#lib/components/fundamentos/DocumentReader.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PageMeta
	title="Fundamentos | RUTA LIBRE"
	description={data.document.summary}
	ogTitle="{data.document.title} | RUTA LIBRE"
/>

<DocumentReader document={data.document} />
