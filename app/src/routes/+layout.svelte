<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { consent } from '#lib/privacy/consent.svelte.ts';
	import Header from '#lib/components/ui/Header.svelte';
	import Footer from '#lib/components/ui/Footer.svelte';
	import ConsentBanner from '#lib/components/ui/ConsentBanner.svelte';
	import ChatLauncher from '#lib/components/chat/ChatLauncher.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(() => {
		consent.load();
	});

	onNavigate((navigation) => {
		if (!('startViewTransition' in document)) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				try {
					await navigation.complete;
				} catch {}
			});
		});
	});
</script>

<a class="skip" href="#main">Saltar al contenido</a>
<ConsentBanner />
<Header />
<div class="sheet">
	{@render children()}
</div>
<Footer />
{#if page.url.pathname !== '/preguntar'}
	<div class="launcher-clear" aria-hidden="true"></div>
{/if}
<ChatLauncher />

<style>
	.skip {
		position: absolute;
		left: 8px;
		top: -80px;
		z-index: 2000;
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0 18px;
		border-radius: var(--radius-sm);
		background: var(--ink);
		color: var(--white);
		font-weight: 500;
		text-decoration: none;
	}

	.skip:focus {
		top: 8px;
	}

	.sheet {
		min-height: 60vh;
	}

	.launcher-clear {
		height: calc(44px + 16px + env(safe-area-inset-bottom));
	}

	:global(html:root) {
		scroll-padding-bottom: calc(var(--consent-h, 0px) + 44px + 32px);
	}
</style>
