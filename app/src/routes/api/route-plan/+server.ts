import { json } from '@sveltejs/kit';
import { clinics } from '#lib/data/clinics.ts';
import { stations } from '#lib/data/stations.ts';
import { computeTransitRoutes, RoutesApiError } from '#lib/server/routes-api.ts';
import type { RoutePlanBody } from '#lib/maps/route-plan.ts';
import type { RoutePlanResponse } from '#lib/types.ts';
import type { RequestHandler } from './$types';

const NO_STORE = { 'Cache-Control': 'no-store' };

function fail(message: string, status: number) {
	return json({ message }, { status, headers: NO_STORE });
}

export const POST: RequestHandler = async ({ request }) => {
	let payload: Partial<RoutePlanBody>;
	try {
		payload = (await request.json()) as Partial<RoutePlanBody>;
	} catch {
		return fail('La solicitud no tiene un formato válido.', 400);
	}

	if (typeof payload !== 'object' || payload === null) {
		return fail('La solicitud no tiene un formato válido.', 400);
	}

	const station = stations.find((item) => item.id === payload.stationId);
	if (!station) return fail('La estación elegida no existe en la lista.', 400);

	const clinic = clinics.find((item) => item.id === payload.clinicId);
	if (!clinic) return fail('El servicio elegido no existe en la lista.', 400);

	if (payload.direction !== undefined && payload.direction !== 'outbound' && payload.direction !== 'return') {
		return fail('La dirección del trayecto no es válida.', 400);
	}

	if (payload.departureTime !== undefined) {
		if (typeof payload.departureTime !== 'string' || Number.isNaN(Date.parse(payload.departureTime))) {
			return fail('La hora de salida no es válida.', 400);
		}
	}

	const isReturn = payload.direction === 'return';
	const origin = isReturn ? clinic.location : station.location;
	const destination = isReturn ? station.location : clinic.location;

	try {
		const routes = await computeTransitRoutes(origin, destination, payload.departureTime);
		const body: RoutePlanResponse = { routes, source: 'live' };
		return json(body, { headers: NO_STORE });
	} catch (error) {
		const message =
			error instanceof RoutesApiError
				? error.message
				: 'No pudimos calcular los trayectos por ahora.';
		return fail(`${message} Inténtalo de nuevo en unos minutos.`, 502);
	}
};
