const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;
const SWEEP_AT = 2000;

const hits = new Map<string, number[]>();

function sweep(now: number): void {
	for (const [key, times] of hits) {
		if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(key);
	}
}

export function takeSlot(ip: string, now: number = Date.now()): { allowed: boolean; retryAfter: number } {
	if (hits.size > SWEEP_AT) sweep(now);
	const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
	if (recent.length >= MAX_REQUESTS) {
		hits.set(ip, recent);
		const oldest = recent[0] ?? now;
		return { allowed: false, retryAfter: Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000)) };
	}
	recent.push(now);
	hits.set(ip, recent);
	return { allowed: true, retryAfter: 0 };
}
