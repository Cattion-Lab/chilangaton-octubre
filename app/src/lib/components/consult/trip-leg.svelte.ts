import type { RouteDirection, RoutePlanBody } from '#lib/maps/route-plan.ts';
import { consent } from '#lib/privacy/consent.svelte.ts';
import type { RouteOption, RoutePlanResponse } from '#lib/types.ts';

const REQUEST_TIMEOUT_MS = 20000;

export type LegStatus = 'idle' | 'loading' | 'done' | 'error';
export type DepartureMode = 'now' | 'custom';

function buildDeparture(mode: DepartureMode, clock: string): string | undefined | null {
	if (mode === 'now') return undefined;
	const match = /^(\d{2}):(\d{2})$/.exec(clock);
	if (!match) return null;
	const date = new Date();
	date.setHours(Number(match[1]), Number(match[2]), 0, 0);
	if (date.getTime() <= Date.now()) return null;
	return date.toISOString();
}

export class TripLeg {
	direction: RouteDirection;
	status = $state<LegStatus>('idle');
	routes = $state.raw<RouteOption[]>([]);
	selected = $state(0);
	message = $state('');
	mode = $state<DepartureMode>('now');
	clock = $state('');
	private token = 0;

	constructor(direction: RouteDirection) {
		this.direction = direction;
	}

	reset(): void {
		this.token += 1;
		this.status = 'idle';
		this.routes = [];
		this.selected = 0;
		this.message = '';
	}

	async load(stationId: string, clinicId: string): Promise<boolean> {
		if (!consent.accepted) return false;
		const departureTime = buildDeparture(this.mode, this.clock);
		if (departureTime === null) {
			this.status = 'error';
			this.routes = [];
			this.message = 'Elige una hora de salida de hoy que todavía no haya pasado.';
			return false;
		}

		this.token += 1;
		const current = this.token;
		this.status = 'loading';
		this.message = '';
		this.routes = [];
		this.selected = 0;

		const body: RoutePlanBody = { stationId, clinicId, direction: this.direction };
		if (departureTime) body.departureTime = departureTime;

		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

		try {
			const response = await fetch('/api/route-plan', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				cache: 'no-store',
				signal: controller.signal,
				body: JSON.stringify(body)
			});
			const data = await response.json().catch(() => null);
			if (current !== this.token) return false;
			if (!response.ok) {
				this.status = 'error';
				this.message =
					typeof data?.message === 'string'
						? data.message
						: response.status === 429
							? 'Hay muchas consultas en este momento. Espera un poco y vuelve a intentarlo.'
							: 'No pudimos calcular los trayectos por ahora.';
				return false;
			}
			const plan = data as RoutePlanResponse;
			this.routes = plan.routes;
			this.status = 'done';
			if (plan.routes.length === 0) {
				this.message =
					'No encontramos trayectos en transporte público para esta hora. Prueba con otra hora de salida.';
			}
			return plan.routes.length > 0;
		} catch {
			if (current !== this.token) return false;
			this.status = 'error';
			this.message = controller.signal.aborted
				? 'El cálculo tardó demasiado. Inténtalo de nuevo.'
				: 'No pudimos conectar. Revisa tu conexión e inténtalo de nuevo.';
			return false;
		} finally {
			clearTimeout(timer);
		}
	}
}
