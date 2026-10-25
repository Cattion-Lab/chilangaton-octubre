import { stations } from '#lib/data/stations.ts';
import type { Station, TransitSystem } from '#lib/types.ts';

const SYSTEM_ORDER: { system: TransitSystem; label: string }[] = [
	{ system: 'metro', label: 'Metro' },
	{ system: 'metrobus', label: 'Metrobús' },
	{ system: 'tren-ligero', label: 'Tren Ligero' },
	{ system: 'cablebus', label: 'Cablebús' },
	{ system: 'trolebus', label: 'Trolebús' },
	{ system: 'tren-suburbano', label: 'Tren Suburbano' }
];

export function buildStationGroups() {
	return SYSTEM_ORDER.map(({ system, label }) => ({
		system,
		label,
		stations: stations
			.filter((station: Station) => station.system === system)
			.sort((a, b) => a.name.localeCompare(b.name, 'es'))
	})).filter((group) => group.stations.length > 0);
}
