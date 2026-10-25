const timeFormat = new Intl.DateTimeFormat('es-MX', {
	hour: '2-digit',
	minute: '2-digit',
	hour12: false,
	timeZone: 'America/Mexico_City'
});

export function formatClock(iso: string | undefined): string | null {
	if (!iso) return null;
	const date = new Date(iso);
	return Number.isNaN(date.getTime()) ? null : timeFormat.format(date);
}

export function transfersText(count: number): string {
	if (count === 0) return 'sin transbordos';
	return count === 1 ? '1 transbordo' : `${count} transbordos`;
}
