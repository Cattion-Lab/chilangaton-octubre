<script lang="ts">
	import { vehicleLabel } from '#lib/maps/vehicles.ts';
	import type { RouteOption } from '#lib/types.ts';

	interface Props {
		title: string;
		routes: RouteOption[];
	}

	let { title, routes }: Props = $props();

	const timeFormat = new Intl.DateTimeFormat('es-MX', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'America/Mexico_City'
	});

	function formatTime(iso: string | undefined): string | null {
		if (!iso) return null;
		const date = new Date(iso);
		return Number.isNaN(date.getTime()) ? null : timeFormat.format(date);
	}

	function transfersText(count: number): string {
		if (count === 0) return 'Sin transbordos';
		return count === 1 ? '1 transbordo' : `${count} transbordos`;
	}
</script>

<section class="results" aria-label={title}>
	<h3>{title}</h3>
	<ol>
		{#each routes as route, index (index)}
			{@const departs = formatTime(route.departureTime)}
			{@const arrives = formatTime(route.arrivalTime)}
			<li class="card">
				<span class="minutes"><strong>{route.minutes}</strong> min</span>
				<span class="facts">
					<span>{transfersText(route.transfers)}</span>
					<span>{route.walkingMinutes} min caminando</span>
					{#if departs && arrives}
						<span>Sale {departs}, llega {arrives}</span>
					{/if}
				</span>
				<span class="lines">
					{#each route.lines as line, lineIndex (lineIndex)}
						<span class="line">{vehicleLabel(line.vehicle)} {line.name}</span>
					{/each}
				</span>
			</li>
		{/each}
	</ol>
</section>

<style>
	.results {
		display: grid;
		gap: 8px;
	}

	h3 {
		font-size: 16px;
		font-weight: 500;
		color: var(--ink);
	}

	ol {
		border: 1px solid var(--rule);
		border-radius: var(--radius);
		background: var(--white);
	}

	.card {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 6px 16px;
		align-items: start;
		padding: 12px 16px;
	}

	.card + .card {
		border-top: 1px solid var(--rule);
	}

	.minutes {
		font-size: 16px;
		white-space: nowrap;
	}

	.minutes strong {
		font-size: 20px;
		font-weight: 600;
		line-height: 1.2;
	}

	.facts {
		display: grid;
		gap: 2px;
		font-size: 15px;
		color: var(--ink-soft);
	}

	.lines {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.line {
		padding: 2px 8px;
		border-radius: 4px;
		background: color-mix(in srgb, var(--pino) 12%, var(--white));
		color: var(--pino);
		font-size: 14px;
		font-weight: 500;
		line-height: 1.5;
	}
</style>
