<script lang="ts">
	let { fill = 1 }: { fill?: number } = $props();
</script>

<span class="star" aria-hidden="true">
	<svg viewBox="0 0 24 24" class="outline">
		<path d="M12 2.8l2.9 6 6.5.9-4.7 4.6 1.1 6.5L12 17.7l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" />
	</svg>
	<span class="fill" style:width="{Math.max(0, Math.min(1, fill)) * 100}%">
		<svg viewBox="0 0 24 24">
			<path d="M12 2.8l2.9 6 6.5.9-4.7 4.6 1.1 6.5L12 17.7l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" />
		</svg>
	</span>
</span>

<style>
	.star {
		position: relative;
		display: inline-block;
		width: var(--star-size, 16px);
		height: var(--star-size, 16px);
		color: var(--guinda);
	}

	svg {
		width: var(--star-size, 16px);
		height: var(--star-size, 16px);
		max-width: none;
	}

	.outline path {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.2;
		stroke-linejoin: round;
	}

	.fill {
		position: absolute;
		inset: 0 auto 0 0;
		overflow: hidden;
	}

	.fill path {
		fill: currentColor;
		stroke: currentColor;
		stroke-width: 1.2;
		stroke-linejoin: round;
	}
</style>
