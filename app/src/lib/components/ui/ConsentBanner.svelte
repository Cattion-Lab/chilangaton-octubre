<script lang="ts">
	import { page } from '$app/state';
	import ChoiceGroup from '#lib/components/consult/ChoiceGroup.svelte';
	import { acceptConsent, dismissBanner } from '#lib/components/consult/consent-actions.ts';

	let height = $state(0);
	let band = $state<HTMLElement>();

	$effect(() => {
		if (!band) return;
		document.documentElement.style.setProperty('--consent-h', `${height + 32}px`);
		return () => document.documentElement.style.removeProperty('--consent-h');
	});
</script>

{#if page.url.pathname !== '/privacidad'}
	<div class="band" role="region" aria-labelledby="consent-title" bind:this={band} bind:clientHeight={height}>
		<div class="copy">
			<p class="title" id="consent-title">Sobre tu privacidad</p>
			<p>No usamos cookies de rastreo ni analítica, y no pedimos tu ubicación ni datos que te identifiquen.</p>
		</div>
		<ChoiceGroup>
			<button type="button" class="choice primary" onclick={acceptConsent}>Aceptar</button>
			<a class="choice" href="/privacidad">Leer aviso de privacidad</a>
			<button type="button" class="choice" onclick={dismissBanner}>Ahora no</button>
		</ChoiceGroup>
	</div>
{/if}

<style>
	:global(body) {
		padding-bottom: var(--consent-h, 0px);
	}

	:global(html) {
		scroll-padding-bottom: var(--consent-h, 0px);
	}

	:global(html[data-consent='yes']),
	:global(html[data-banner-dismissed='yes']) {
		--consent-h: 0px !important;
	}

	.band {
		display: none;
	}

	:global(html[data-js='yes']) .band {
		display: grid;
	}

	.band {
		position: fixed;
		right: 0;
		bottom: 16px;
		left: 0;
		z-index: 1000;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 16px 32px;
		align-items: end;
		width: min(960px, calc(100% - 32px));
		margin-inline: auto;
		padding: 20px 24px;
		background: var(--white);
		border: 1px solid var(--rule);
		border-radius: var(--radius-lg);
		box-shadow: 0 8px 28px rgb(58 30 18 / 0.1);
		transition:
			opacity 150ms ease-in,
			visibility 0s linear 150ms;
		animation: band-in 200ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	:global(html[data-consent='yes']) .band,
	:global(html[data-banner-dismissed='yes']) .band {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
	}

	.title {
		font-size: 19px;
		font-weight: 600;
		line-height: 1.3;
	}

	p {
		max-width: 64ch;
	}

	p + p {
		margin-top: 6px;
	}

	@keyframes band-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 899px) {
		.band {
			bottom: 12px;
			grid-template-columns: 1fr;
			width: calc(100% - 24px);
			gap: 12px;
			padding: 14px 16px 16px;
		}

		.title {
			font-size: 17px;
		}

		p {
			font-size: 15px;
			line-height: 1.45;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.band {
			animation: none;
			transition: none;
		}
	}
</style>
