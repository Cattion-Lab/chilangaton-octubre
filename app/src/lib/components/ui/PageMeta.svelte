<script lang="ts">
	import { page } from '$app/state';

	let {
		title,
		description,
		ogTitle
	}: { title: string; description: string; ogTitle?: string } = $props();

	const canonical = $derived(`${page.url.origin}${page.url.pathname}`);
	const tabTitle = $derived(title.replace(' | RUTA LIBRE', ' · RUTA LIBRE'));
	const shareTitle = $derived(ogTitle ?? title);
</script>

<svelte:head>
	<title>{tabTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="es_MX" />
	<meta property="og:site_name" content="RUTA LIBRE" />
	<meta property="og:title" content={shareTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={shareTitle} />
	<meta name="twitter:description" content={description} />
</svelte:head>
