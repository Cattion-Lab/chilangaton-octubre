<script lang="ts">
	import type { Station, TransitSystem } from '#lib/types.ts';

	interface StationGroup {
		system: TransitSystem;
		label: string;
		stations: Station[];
	}

	interface Props {
		groups: StationGroup[];
		value: string;
		onchange: () => void;
	}

	let { groups, value = $bindable(), onchange }: Props = $props();

	function describe(station: Station): string {
		const lines = station.lines.length > 0 ? ` (${station.lines.join(', ')})` : '';
		return `${station.name}${lines}`;
	}
</script>

<div class="field">
	<label for="station-select">¿Desde qué estación sales?</label>
	<select id="station-select" bind:value {onchange}>
		<option value="">Prefiero no decirlo</option>
		{#each groups as group (group.system)}
			<optgroup label={group.label}>
				{#each group.stations as station (station.id)}
					<option value={station.id}>{describe(station)}</option>
				{/each}
			</optgroup>
		{/each}
	</select>
</div>

<style>
	.field {
		display: grid;
		gap: 6px;
	}

	label {
		font-size: 15px;
		font-weight: 500;
	}

	select {
		width: 100%;
		min-height: 46px;
		padding: 0 40px 0 12px;
		border: 1px solid var(--line);
		border-radius: var(--radius-sm);
		background: var(--white)
			url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%233a1e12' stroke-width='1.6'/%3E%3C/svg%3E")
			no-repeat right 14px center;
		color: var(--ink);
		font-family: var(--font-body);
		font-size: 17px;
		line-height: 1.2;
		appearance: none;
	}
</style>
