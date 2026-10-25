<script lang="ts">
	const EXIT_URL = 'https://www.google.com/search?q=clima+en+la+ciudad+de+mexico';
	const DOUBLE_PRESS_MS = 900;

	let lastEscapeAt = 0;

	function leave(): void {
		try {
			sessionStorage.clear();
		} catch {}
		location.replace(EXIT_URL);
	}

	function handleClick(event: MouseEvent): void {
		event.preventDefault();
		leave();
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key !== 'Escape' || event.repeat) return;
		const now = Date.now();
		if (now - lastEscapeAt <= DOUBLE_PRESS_MS) {
			lastEscapeAt = 0;
			leave();
			return;
		}
		lastEscapeAt = now;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<a
	class="exit"
	href={EXIT_URL}
	rel="noreferrer noopener"
	onclick={handleClick}
	title="También puedes pulsar Escape dos veces"
>
	Salida rápida
	<svg viewBox="0 0 16 16" aria-hidden="true">
		<path
			d="M6 3H3v10h3M10 5l3 3-3 3M13 8H6.5"
			fill="none"
			stroke="currentColor"
			stroke-width="1.6"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</a>

<style>
	.exit {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		min-height: 44px;
		padding: 0 14px;
		border-radius: var(--radius-sm);
		background: var(--ink);
		color: var(--white);
		font-weight: 500;
		font-size: 15px;
		text-decoration: none;
		white-space: nowrap;
		transition: background-color 120ms ease;
	}

	.exit:hover {
		background: #2a150c;
		color: var(--white);
		text-decoration: none;
	}

	.exit svg {
		width: 16px;
		height: 16px;
	}

	@media (max-width: 359px) {
		.exit {
			padding: 0 10px;
		}

		.exit svg {
			display: none;
		}
	}
</style>
