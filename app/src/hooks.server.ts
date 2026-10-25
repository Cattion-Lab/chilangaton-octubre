import { json } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';
import { ratingsAvailable } from '#lib/server/ratings/store.ts';

const RATINGS_PATH = '/api/ratings';

const SECURITY_HEADERS: Record<string, string> = {
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy': 'geolocation=(), camera=(), microphone=()'
};

function ratingsUnavailable(method: string): Response {
	const message =
		method === 'POST'
			? 'No pudimos guardar tu calificación por ahora. Inténtalo de nuevo en unos minutos.'
			: 'No pudimos consultar las calificaciones por ahora.';
	return json({ message }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
}

function withSecurityHeaders(response: Response): Response {
	try {
		for (const [name, value] of Object.entries(SECURITY_HEADERS)) response.headers.set(name, value);
		return response;
	} catch {
		const copy = new Response(response.body, response);
		for (const [name, value] of Object.entries(SECURITY_HEADERS)) copy.headers.set(name, value);
		return copy;
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	if (!ratingsAvailable && event.url.pathname === RATINGS_PATH) {
		return withSecurityHeaders(ratingsUnavailable(event.request.method));
	}
	return withSecurityHeaders(await resolve(event));
};
