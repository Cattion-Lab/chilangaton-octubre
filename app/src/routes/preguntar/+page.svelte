<script lang="ts">
	import { onMount } from 'svelte';
	import PageMeta from '#lib/components/ui/PageMeta.svelte';
	import ChatBody from '#lib/components/chat/ChatBody.svelte';
	import { consent } from '#lib/privacy/consent.svelte.ts';

	onMount(() => {
		consent.load();
	});
</script>

<PageMeta
	title="Preguntar | RUTA LIBRE"
	description="Haz preguntas sobre las clínicas y sobre cómo usar RUTA LIBRE. Las respuestas salen solo de los datos de este sitio."
/>

<main id="main" class="ask">
	<header class="ask-head">
		<h1>Preguntar</h1>
	</header>
	<ChatBody id="page" />
</main>

<style>
	.ask-head {
		padding: 28px 32px 8px;
	}

	.ask-head h1 {
		font-size: 26px;
	}

	@media (max-width: 899px) {
		.ask-head {
			padding: 20px 16px 6px;
		}

		.ask-head h1 {
			font-size: 23px;
		}
	}
</style>
