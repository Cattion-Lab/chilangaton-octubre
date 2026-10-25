import { json } from '@sveltejs/kit';
import { CRITERIA, type RatingScores, type RatingsResponse } from '#lib/components/rating/criteria.ts';
import { clinics } from '#lib/data/clinics.ts';
import { isoWeek, isRateLimited, recordSubmission } from '#lib/server/ratings/privacy.ts';
import { getRatingsStore } from '#lib/server/ratings/store.ts';
import type { RequestHandler } from './$types';

const NO_STORE = { 'Cache-Control': 'no-store' };

function fail(message: string, status: number) {
	return json({ message }, { status, headers: NO_STORE });
}

function parseScores(raw: unknown): RatingScores | null {
	if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return null;
	const allowed: Set<string> = new Set(CRITERIA.map((item) => item.key));
	const scores: Record<string, number> = {};
	for (const [key, value] of Object.entries(raw)) {
		if (!allowed.has(key)) return null;
		if (typeof value !== 'number' || !Number.isInteger(value) || value < 1 || value > 5) return null;
		scores[key] = value;
	}
	return scores as RatingScores;
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	let payload: { clinicId?: unknown; scores?: unknown };
	try {
		payload = await request.json();
	} catch {
		return fail('La solicitud no tiene un formato válido.', 400);
	}
	if (typeof payload !== 'object' || payload === null) {
		return fail('La solicitud no tiene un formato válido.', 400);
	}

	const clinic = clinics.find((item) => item.id === payload.clinicId);
	if (!clinic) return fail('El servicio elegido no existe en la lista.', 400);

	const scores = parseScores(payload.scores);
	if (!scores) return fail('Las calificaciones deben ser números del 1 al 5.', 400);
	if (Object.keys(scores).length === 0) return fail('Califica al menos un criterio.', 400);

	const ip = getClientAddress();
	const userAgent = request.headers.get('user-agent') ?? '';
	if (await isRateLimited(clinic.id, ip, userAgent)) {
		return fail('Ya enviaste varias calificaciones para este lugar hoy. Puedes volver mañana.', 429);
	}

	try {
		await getRatingsStore().submit({
			clinicId: clinic.id,
			scores,
			comment: null,
			commentStatus: 'none',
			week: isoWeek(new Date())
		});
	} catch {
		return fail('No pudimos guardar tu calificación por ahora. Inténtalo de nuevo en unos minutos.', 502);
	}

	await recordSubmission(clinic.id, ip, userAgent);
	return json({ ok: true }, { status: 201, headers: NO_STORE });
};

export const GET: RequestHandler = async ({ url }) => {
	const clinicId = url.searchParams.get('clinicId');
	const clinic = clinics.find((item) => item.id === clinicId);
	if (!clinic) return fail('El servicio elegido no existe en la lista.', 400);

	try {
		const store = getRatingsStore();
		const [summary, comments] = await Promise.all([
			store.summary(clinic.id),
			store.approvedComments(clinic.id)
		]);
		const body: RatingsResponse = { summary, comments };
		return json(body, { headers: NO_STORE });
	} catch {
		return fail('No pudimos consultar las calificaciones por ahora.', 502);
	}
};
