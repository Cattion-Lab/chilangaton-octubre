export interface LatLng {
	latitude: number;
	longitude: number;
}

export type TransitSystem =
	| 'metro'
	| 'metrobus'
	| 'tren-ligero'
	| 'cablebus'
	| 'trolebus'
	| 'tren-suburbano';

export interface Station {
	id: string;
	name: string;
	system: TransitSystem;
	lines: string[];
	borough: string;
	location: LatLng;
}

export type ClinicKind = 'ile-publica' | 'orientacion' | 'organizacion';

export type VerificationStatus = 'verificada' | 'por-verificar';

export interface Clinic {
	id: string;
	name: string;
	kind: ClinicKind;
	address: string;
	borough: string;
	location: LatLng;
	hours: string;
	requirements: string[];
	services: string[];
	phone?: string;
	sourceName: string;
	sourceUrl: string;
	verifiedAt: string | null;
	verificationStatus: VerificationStatus;
}

export interface RouteLine {
	name: string;
	vehicle: string;
}

export interface RouteOption {
	minutes: number;
	transfers: number;
	walkingMinutes: number;
	lines: RouteLine[];
	polyline: string;
	departureTime?: string;
	arrivalTime?: string;
}

export interface RoutePlanRequest {
	stationId: string;
	clinicId: string;
	departureTime?: string;
}

export interface RoutePlanResponse {
	routes: RouteOption[];
	source: 'live' | 'precomputed';
}

export const CDMX_BOUNDS = {
	north: 19.5927,
	south: 19.0482,
	west: -99.3651,
	east: -98.9403
} as const;
