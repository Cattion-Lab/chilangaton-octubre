import { GOOGLE_ROUTES_KEY } from '$app/env/private';
import type { LatLng, RouteLine, RouteOption } from '#lib/types.ts';

const ENDPOINT = 'https://routes.googleapis.com/directions/v2:computeRoutes';

const FIELD_MASK = [
	'routes.duration',
	'routes.polyline.encodedPolyline',
	'routes.legs.steps.travelMode',
	'routes.legs.steps.staticDuration',
	'routes.legs.steps.transitDetails.transitLine.nameShort',
	'routes.legs.steps.transitDetails.transitLine.name',
	'routes.legs.steps.transitDetails.transitLine.vehicle.type',
	'routes.legs.steps.transitDetails.stopDetails.arrivalTime',
	'routes.legs.steps.transitDetails.stopDetails.departureTime'
].join(',');

const MAX_ROUTES = 3;

interface RawStep {
	travelMode?: string;
	staticDuration?: string;
	transitDetails?: {
		transitLine?: {
			name?: string;
			nameShort?: string;
			vehicle?: { type?: string };
		};
		stopDetails?: { arrivalTime?: string; departureTime?: string };
	};
}

interface RawRoute {
	duration?: string;
	polyline?: { encodedPolyline?: string };
	legs?: { steps?: RawStep[] }[];
}

interface RawResponse {
	routes?: RawRoute[];
}

export class RoutesApiError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'RoutesApiError';
	}
}

function parseSeconds(value: string | undefined): number {
	if (!value) return 0;
	const seconds = Number.parseFloat(value.replace('s', ''));
	return Number.isFinite(seconds) ? seconds : 0;
}

function toWaypoint(point: LatLng) {
	return { location: { latLng: { latitude: point.latitude, longitude: point.longitude } } };
}

function convertRoute(route: RawRoute, departure: Date): RouteOption {
	const steps = (route.legs ?? []).flatMap((leg) => leg.steps ?? []);
	const durationSeconds = parseSeconds(route.duration);

	const transitSteps = steps.filter((step) => step.travelMode === 'TRANSIT');
	const walkingSeconds = steps
		.filter((step) => step.travelMode === 'WALK')
		.reduce((total, step) => total + parseSeconds(step.staticDuration), 0);

	const lines: RouteLine[] = transitSteps.map((step) => {
		const line = step.transitDetails?.transitLine;
		return {
			name: line?.nameShort || line?.name || 'Transporte público',
			vehicle: line?.vehicle?.type ?? 'TRANSIT'
		};
	});

	return {
		minutes: Math.max(1, Math.round(durationSeconds / 60)),
		transfers: Math.max(0, transitSteps.length - 1),
		walkingMinutes: Math.round(walkingSeconds / 60),
		lines,
		polyline: route.polyline?.encodedPolyline ?? '',
		departureTime: departure.toISOString(),
		arrivalTime: new Date(departure.getTime() + durationSeconds * 1000).toISOString()
	};
}

export async function computeTransitRoutes(
	origin: LatLng,
	destination: LatLng,
	departureTime?: string
): Promise<RouteOption[]> {
	const now = new Date();
	let departure = now;
	if (departureTime) {
		const requested = new Date(departureTime);
		if (!Number.isNaN(requested.getTime()) && requested.getTime() > now.getTime() + 60_000) {
			departure = requested;
		}
	}

	const body: Record<string, unknown> = {
		origin: toWaypoint(origin),
		destination: toWaypoint(destination),
		travelMode: 'TRANSIT',
		computeAlternativeRoutes: true,
		languageCode: 'es-MX',
		regionCode: 'MX'
	};
	if (departure !== now) body.departureTime = departure.toISOString();

	let response: Response;
	try {
		response = await fetch(ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Goog-Api-Key': GOOGLE_ROUTES_KEY,
				'X-Goog-FieldMask': FIELD_MASK
			},
			body: JSON.stringify(body),
			signal: AbortSignal.timeout(15_000)
		});
	} catch {
		throw new RoutesApiError('No pudimos conectar con el servicio de rutas.');
	}

	if (!response.ok) {
		throw new RoutesApiError(`El servicio de rutas respondió con error (${response.status}).`);
	}

	const data = (await response.json()) as RawResponse;
	return (data.routes ?? [])
		.map((route) => convertRoute(route, departure))
		.sort((a, b) => a.minutes - b.minutes)
		.slice(0, MAX_ROUTES);
}
