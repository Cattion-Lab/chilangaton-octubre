<script lang="ts">
	import { vehicleLabel } from '#lib/maps/vehicles.ts';
	import type { RouteOption } from '#lib/types.ts';
	import { formatClock, transfersText } from './format.ts';

	interface Props {
		routes: RouteOption[];
		selected: number;
		onselect: (index: number) => void;
	}

	let { routes, selected, onselect }: Props = $props();

	const route = $derived(routes[selected] ?? routes[0]);
	const departs = $derived(formatClock(route?.departureTime));
	const arrives = $derived(formatClock(route?.arrivalTime));
</script>

{#if routes.length > 1}
	<ul class="options" aria-label="Opciones de trayecto">
		{#each routes as option, index (index)}
			<li>
				<button type="button" aria-pressed={index === selected} onclick={() => onselect(index)}>
					<span class="mins">{option.minutes} min</span>
					<span class="meta">
						{transfersText(option.transfers)} · {option.walkingMinutes} min a pie
					</span>
				</button>
			</li>
		{/each}
	</ul>
{/if}

{#if route}
	<p class="sum">
		<span><b>{route.minutes} min</b> en total</span>
		<span>{transfersText(route.transfers)}</span>
		<span>{route.walkingMinutes} min a pie</span>
		{#if departs && arrives}
			<span>Sale {departs}, llega {arrives}</span>
		{/if}
	</p>
	<ol class="legs">
		{#each route.lines as line, index (index)}
			<li>
				<span class="mode">{vehicleLabel(line.vehicle)} {line.name}</span>
			</li>
		{/each}
		{#if route.walkingMinutes > 0}
			<li class="walk">
				<span class="mode">A pie</span>
				<span class="detail">{route.walkingMinutes} min en total</span>
			</li>
		{/if}
	</ol>
{/if}

<style>
	.options {
		border-bottom: 1px solid var(--rule);
	}

	.options li + li {
		border-top: 1px solid var(--rule);
	}

	.options button {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 2px 16px;
		width: 100%;
		min-height: 44px;
		padding: 10px 16px;
		border: 0;
		background: transparent;
		color: var(--ink);
		font: inherit;
		font-size: 15px;
		text-align: left;
		cursor: pointer;
	}

	.options button:hover {
		background: var(--guinda-tint);
	}

	.options button[aria-pressed='true'] {
		background: var(--tint);
		font-weight: 600;
	}

	.mins {
		font-weight: 600;
	}

	.meta {
		color: var(--ink-soft);
	}

	.sum {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 18px;
		padding: 12px 16px;
		border-bottom: 1px solid var(--rule);
		font-size: 15px;
	}

	.legs {
		counter-reset: leg;
	}

	.legs li {
		display: grid;
		grid-template-columns: 28px minmax(0, 1fr);
		gap: 2px 12px;
		padding: 12px 16px;
	}

	.legs li + li {
		border-top: 1px solid var(--rule);
	}

	.legs li::before {
		counter-increment: leg;
		content: counter(leg);
		grid-row: 1 / span 2;
		display: grid;
		place-items: center;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: var(--pino);
		color: var(--white);
		font-size: 14px;
		font-weight: 500;
	}

	.legs li.walk::before {
		background: var(--white);
		color: var(--pino);
		box-shadow: inset 0 0 0 1px var(--pino);
	}

	.mode {
		grid-column: 2;
		font-weight: 500;
	}

	.detail {
		grid-column: 2;
		font-size: 15px;
		color: var(--ink-soft);
	}
</style>
