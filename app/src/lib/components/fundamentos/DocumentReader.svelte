<script lang="ts">
	import type { FundamentosDocument } from '#lib/content/fundamentos.ts';

	let { document }: { document: FundamentosDocument } = $props();
</script>

{#snippet outline()}
	<ol>
		{#each document.headings as heading (heading.id)}
			<li class:sub={heading.depth === 3}>
				<a href="#{heading.id}">{heading.text}</a>
			</li>
		{/each}
	</ol>
{/snippet}

<main id="main" class="reader">
	{#if document.headings.length > 0}
		<aside class="toc">
			<nav aria-label="En este documento">
				<p>En este documento</p>
				{@render outline()}
			</nav>
		</aside>
	{/if}

	<article class="reading">
		<p class="back"><a href="/fundamentos">Fundamentos e investigación</a></p>
		<h1>{document.title}</h1>

		{#if document.officialLink}
			<p class="official">
				Liga oficial:
				<a href={document.officialLink.href} rel="noopener">{document.officialLink.label}</a>
			</p>
		{/if}

		{#if document.headings.length > 0}
			<details class="toc-mobile">
				<summary>En este documento</summary>
				<nav aria-label="En este documento (móvil)">
					{@render outline()}
				</nav>
			</details>
		{/if}

		<div class="prose">
			{@html document.html}
		</div>
	</article>
</main>

<style>
	.reader {
		display: grid;
		grid-template-columns: 300px minmax(0, 1fr);
	}

	.toc {
		border-right: 1px solid var(--rule);
	}

	.toc nav {
		position: sticky;
		top: var(--header-h);
		max-height: calc(100dvh - var(--header-h));
		padding: 28px 24px;
		overflow-y: auto;
	}

	.toc p {
		margin-bottom: 8px;
		font-size: 14px;
		font-weight: 500;
		color: var(--ink-soft);
	}

	.toc li {
		border-top: 1px solid var(--rule);
	}

	.toc li.sub {
		border-top-color: transparent;
		padding-left: 14px;
	}

	.toc a {
		display: flex;
		align-items: center;
		min-height: 44px;
		padding: 4px 0;
		font-size: 15px;
		line-height: 1.3;
		color: var(--ink);
		text-decoration: none;
	}

	.toc li.sub a {
		min-height: 40px;
		font-size: 14px;
		color: var(--ink-soft);
	}

	.toc a:hover {
		color: var(--guinda);
	}

	.reading {
		min-width: 0;
		padding: 36px 48px 56px;
	}

	.back {
		margin-bottom: 8px;
		font-size: 15px;
	}

	.back a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		color: var(--guinda);
		text-underline-offset: 3px;
	}

	h1 {
		max-width: var(--measure);
		font-size: 30px;
		line-height: 1.25;
	}

	.official {
		margin-top: 12px;
		font-size: 16px;
		color: var(--ink-soft);
	}

	.official a {
		color: var(--guinda);
		text-underline-offset: 3px;
	}

	.toc-mobile {
		display: none;
	}

	.prose {
		margin-top: 8px;
		font-size: 17px;
		line-height: 1.65;
		overflow-wrap: anywhere;
	}

	.prose > :global(*:not(.table-wrap)) {
		max-width: var(--measure);
	}

	.prose :global(h2) {
		margin-top: 40px;
		padding-top: 28px;
		border-top: 1px solid var(--rule);
		font-size: 24px;
		line-height: 1.3;
		scroll-margin-top: 8px;
	}

	.prose :global(h3) {
		margin-top: 28px;
		font-size: 19px;
		line-height: 1.35;
		scroll-margin-top: 8px;
	}

	.prose :global(h4),
	.prose :global(h5),
	.prose :global(h6) {
		margin-top: 22px;
		font-size: 17px;
		scroll-margin-top: 8px;
	}

	.prose :global(p),
	.prose :global(ul),
	.prose :global(ol),
	.prose :global(blockquote),
	.prose :global(.table-wrap) {
		margin-top: 14px;
	}

	.prose :global(ul),
	.prose :global(ol) {
		padding-left: 1.3em;
	}

	.prose :global(ul) {
		list-style: disc;
	}

	.prose :global(ol) {
		list-style: decimal;
	}

	.prose :global(li + li) {
		margin-top: 8px;
	}

	.prose :global(li::marker) {
		color: var(--guinda);
	}

	.prose :global(a) {
		color: var(--guinda);
		text-underline-offset: 3px;
	}

	.prose :global(blockquote) {
		padding: 12px 16px;
		border-left: 3px solid var(--guinda);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
		background: var(--tint);
	}

	.prose :global(blockquote p:first-child) {
		margin-top: 0;
	}

	.prose :global(hr) {
		margin: 28px 0;
		border: 0;
		border-top: 1px solid var(--rule);
	}

	.prose :global(code) {
		padding: 1px 5px;
		border-radius: 4px;
		background: var(--tint);
		font-size: 0.92em;
	}

	.prose :global(.table-wrap) {
		max-width: 100%;
		overflow-x: auto;
		border: 1px solid var(--rule);
		border-radius: var(--radius-sm);
	}

	.prose :global(table) {
		width: 100%;
		min-width: 560px;
		border-collapse: collapse;
		font-size: 15px;
		line-height: 1.5;
	}

	.prose :global(th),
	.prose :global(td) {
		padding: 10px 12px;
		border-bottom: 1px solid var(--rule);
		text-align: left;
		vertical-align: top;
		overflow-wrap: break-word;
	}

	.prose :global(th) {
		background: var(--tint);
		font-weight: 500;
		white-space: nowrap;
	}

	.prose :global(tr:last-child td) {
		border-bottom: 0;
	}

	@media (max-width: 899px) {
		.reader {
			grid-template-columns: minmax(0, 1fr);
		}

		.toc {
			display: none;
		}

		.reading {
			padding: 20px 16px 40px;
		}

		h1 {
			font-size: 25px;
		}

		.toc-mobile {
			display: block;
			margin-top: 18px;
			border: 1px solid var(--rule);
			border-radius: var(--radius-sm);
		}

		.toc-mobile summary {
			display: flex;
			align-items: center;
			min-height: 44px;
			padding: 4px 14px;
			font-weight: 500;
			cursor: pointer;
		}

		.toc-mobile nav {
			padding: 0 14px 10px;
		}

		.toc-mobile li {
			border-top: 1px solid var(--rule);
		}

		.toc-mobile li.sub {
			padding-left: 14px;
		}

		.toc-mobile a {
			display: flex;
			align-items: center;
			min-height: 44px;
			padding: 4px 0;
			font-size: 15px;
			line-height: 1.3;
			color: var(--ink);
			text-decoration: none;
		}

		.prose {
			font-size: 17px;
		}

		.prose :global(h2) {
			margin-top: 32px;
			padding-top: 22px;
			font-size: 21px;
		}

		.prose :global(h3) {
			font-size: 18px;
		}
	}

	@media print {
		.toc,
		.toc-mobile {
			display: none;
		}
	}
</style>
