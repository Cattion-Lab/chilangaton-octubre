import { importLibrary, setOptions } from '@googlemaps/js-api-loader';

let configured = false;

export interface MapLibraries {
	maps: google.maps.MapsLibrary;
	marker: google.maps.MarkerLibrary;
	core: google.maps.CoreLibrary;
}

export function loadMapLibraries(apiKey: string): Promise<MapLibraries> {
	if (!configured) {
		setOptions({ key: apiKey, v: 'weekly', language: 'es-419', region: 'MX' });
		configured = true;
	}
	return Promise.all([
		importLibrary('maps'),
		importLibrary('marker'),
		importLibrary('core')
	]).then(([maps, marker, core]) => ({ maps, marker, core }));
}
