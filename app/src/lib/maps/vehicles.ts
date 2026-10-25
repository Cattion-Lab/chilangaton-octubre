const LABELS: Record<string, string> = {
	SUBWAY: 'Metro',
	BUS: 'Autobús',
	INTERCITY_BUS: 'Autobús',
	TROLLEYBUS: 'Trolebús',
	TRAM: 'Tranvía',
	LIGHT_RAIL: 'Tren ligero',
	HEAVY_RAIL: 'Tren',
	RAIL: 'Tren',
	COMMUTER_TRAIN: 'Tren suburbano',
	MONORAIL: 'Monorriel',
	CABLE_CAR: 'Cablebús',
	GONDOLA_LIFT: 'Cablebús',
	FUNICULAR: 'Funicular',
	FERRY: 'Ferri',
	SHARE_TAXI: 'Colectivo'
};

export function vehicleLabel(type: string): string {
	return LABELS[type] ?? 'Transporte público';
}
