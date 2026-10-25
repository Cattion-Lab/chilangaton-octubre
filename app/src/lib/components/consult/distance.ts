import type { Clinic, LatLng } from '#lib/types.ts';

const EARTH_RADIUS_KM = 6371.0088;

function toRadians(degrees: number): number {
	return (degrees * Math.PI) / 180;
}

export function distanceKm(from: LatLng, to: LatLng): number {
	const deltaLatitude = toRadians(to.latitude - from.latitude);
	const deltaLongitude = toRadians(to.longitude - from.longitude);
	const a =
		Math.sin(deltaLatitude / 2) ** 2 +
		Math.cos(toRadians(from.latitude)) *
			Math.cos(toRadians(to.latitude)) *
			Math.sin(deltaLongitude / 2) ** 2;
	return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

export function sortByDistance(clinics: Clinic[], origin: LatLng): Clinic[] {
	return clinics
		.map((clinic) => ({ clinic, km: distanceKm(origin, clinic.location) }))
		.sort((a, b) => a.km - b.km)
		.map(({ clinic }) => clinic);
}
