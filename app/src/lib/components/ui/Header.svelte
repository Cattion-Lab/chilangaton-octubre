<script lang="ts">
	import { page } from '$app/state';
	import QuickExit from '#lib/components/ui/QuickExit.svelte';

	const links = [
		{ href: '/consultar', label: 'Consultar', short: undefined },
		{ href: '/clinicas', label: 'Clínicas', short: undefined },
		{ href: '/datos', label: 'Datos y fuentes', short: 'Datos' },
		{ href: '/privacidad', label: 'Privacidad', short: undefined }
	];

	function isCurrent(href: string): boolean {
		const path = page.url.pathname;
		return path === href || path.startsWith(`${href}/`);
	}
</script>

<header class="top">
	<div class="top-row">
		<a class="brand" href="/" aria-label="RUTA LIBRE, Movilidad para decidir: ir al inicio">
			<span class="brand-name">RUTA LIBRE</span>
			<span class="brand-sub">Movilidad para decidir</span>
		</a>
		<nav class="nav" aria-label="Principal">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class:current={isCurrent(link.href)}
					aria-current={isCurrent(link.href) ? 'page' : undefined}
				>
					{#if link.short}
						<span class="long">{link.label}</span><span class="short">{link.short}</span>
					{:else}
						{link.label}
					{/if}
				</a>
			{/each}
		</nav>
		<div class="exit-wrap">
			<span class="exit-hint">o pulsa Esc dos veces</span>
			<QuickExit />
		</div>
	</div>
</header>

<style>
	.top {
		position: sticky;
		top: 0;
		z-index: 20;
		background: var(--white);
		border-bottom: 1px solid var(--rule);
		view-transition-name: site-header;
	}

	.top-row {
		display: flex;
		align-items: center;
		gap: 24px;
		max-width: 1200px;
		height: var(--header-h);
		margin: 0 auto;
		padding: 0 33px;
	}

	.brand {
		display: grid;
		gap: 1px;
		align-content: center;
		min-width: 0;
		min-height: 44px;
		color: var(--ink);
		text-decoration: none;
	}

	.brand:hover {
		text-decoration: none;
	}

	.brand-name {
		font-weight: 600;
		font-size: 17px;
		letter-spacing: 0.06em;
		line-height: 1.2;
	}

	.brand-sub {
		font-size: 14px;
		color: var(--ink-soft);
		line-height: 1.2;
	}

	.nav {
		display: flex;
		align-self: stretch;
		margin-left: 16px;
	}

	.nav a {
		display: flex;
		align-items: center;
		padding: 0 14px;
		border-bottom: 2px solid transparent;
		color: var(--ink);
		font-weight: 500;
		font-size: 16px;
		text-decoration: none;
		transition: color 120ms ease;
	}

	.nav a:hover {
		color: var(--guinda);
	}

	.nav a:focus-visible {
		outline-offset: -2px;
	}

	.nav a.current {
		color: var(--guinda);
		border-bottom-color: var(--guinda);
	}

	.nav .short {
		display: none;
	}

	.exit-wrap {
		display: flex;
		flex: none;
		align-items: center;
		gap: 12px;
		margin-left: auto;
	}

	.exit-hint {
		font-size: 14px;
		color: var(--ink-soft);
		white-space: nowrap;
	}

	@media (max-width: 1139px) {
		.top-row {
			gap: 16px;
			padding: 0 24px;
		}

		.nav {
			margin-left: 0;
		}

		.nav a {
			padding: 0 10px;
		}

		.exit-hint {
			display: none;
		}
	}

	@media (max-width: 899px) {
		.top-row {
			flex-wrap: wrap;
			height: auto;
			gap: 0;
			padding: 0;
		}

		.brand {
			flex: 1 1 0;
			min-height: calc(var(--header-h) - 45px);
			padding: 10px 16px;
		}

		.brand-name {
			font-size: 16px;
		}

		.exit-wrap {
			padding: 0 16px;
		}

		.nav {
			order: 3;
			width: 100%;
			margin: 0;
			border-top: 1px solid var(--rule);
		}

		.nav a {
			flex: 1 1 0;
			justify-content: center;
			min-height: 44px;
			padding: 0 4px;
			font-size: 15px;
			text-align: center;
		}

		.nav a + a {
			border-left: 1px solid var(--rule);
		}

		.nav .long {
			display: none;
		}

		.nav .short {
			display: inline;
		}
	}

	@media (max-width: 359px) {
		.brand {
			padding: 10px 12px;
		}

		.exit-wrap {
			padding: 0 12px;
		}

		.nav a {
			font-size: 14px;
		}
	}
</style>
