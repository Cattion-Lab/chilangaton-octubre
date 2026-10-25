<script lang="ts">
	import Pill from '#lib/components/ui/Pill.svelte';
	import { formatVerificationDate, isClinicVerified } from '#lib/data/verification.ts';
	import type { Clinic } from '#lib/types.ts';

	let { clinic }: { clinic: Clinic } = $props();

	const verified = $derived(isClinicVerified(clinic));
</script>

<span class="badge">
	<Pill tone={verified ? 'verified' : 'pending'}>{verified ? 'Verificada' : 'Por verificar'}</Pill>
	{#if verified && clinic.verifiedAt}
		<span class="text">
			el <time datetime={clinic.verifiedAt}>{formatVerificationDate(clinic.verifiedAt)}</time>
		</span>
	{/if}
</span>

<style>
	.badge {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 4px 8px;
	}

	.text {
		font-size: 15px;
		color: var(--ink-soft);
	}
</style>
