<script lang="ts">
	import type { DepartureMode } from './trip-leg.svelte.ts';

	interface Props {
		id: string;
		label: string;
		mode: DepartureMode;
		clock: string;
	}

	let { id, label, mode = $bindable(), clock = $bindable() }: Props = $props();
</script>

<div class="field">
	<label for="{id}-mode">{label}</label>
	<select id="{id}-mode" bind:value={mode}>
		<option value="now">Ahora</option>
		<option value="custom">Elegir otra hora de hoy</option>
	</select>
	{#if mode === 'custom'}
		<label class="time-label" for="{id}-clock">Hora de salida</label>
		<input id="{id}-clock" type="time" bind:value={clock} required />
	{/if}
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

	select,
	input {
		width: 100%;
		min-height: 46px;
		border: 1px solid var(--line);
		border-radius: var(--radius-sm);
		background: var(--white);
		color: var(--ink);
		font-family: var(--font-body);
		font-size: 17px;
		line-height: 1.2;
	}

	select {
		padding: 0 40px 0 12px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%233a1e12' stroke-width='1.6'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 14px center;
		appearance: none;
	}

	input {
		padding: 0 12px;
	}

	.time-label {
		margin-top: 6px;
	}
</style>
