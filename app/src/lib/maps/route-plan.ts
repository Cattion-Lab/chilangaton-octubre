import type { RoutePlanRequest } from '#lib/types.ts';

export type RouteDirection = 'outbound' | 'return';

export interface RoutePlanBody extends RoutePlanRequest {
	direction?: RouteDirection;
}
