import type { LatLng } from '#lib/types.ts';

export function buildDirectionsUrl(origin: LatLng, destination: LatLng): string {
	const params = new URLSearchParams({
		api: '1',
		origin: `${origin.latitude},${origin.longitude}`,
		destination: `${destination.latitude},${destination.longitude}`,
		travelmode: 'transit'
	});
	return `https://www.google.com/maps/dir/?${params.toString()}`;
}
