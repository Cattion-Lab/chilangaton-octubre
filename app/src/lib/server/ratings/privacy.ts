import { MAX_SUBMISSIONS_PER_DAY } from '#lib/components/rating/criteria.ts';

const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const CURP = /\b[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d\b/i;
const DIGIT_RUN = /\d[\d\s().-]{6,}\d/g;

export const IDENTIFYING_TEXT_MESSAGE =
	'Tu comentario parece incluir un correo, un teléfono o una CURP. Quítalo para proteger tu anonimato y el de otras personas, y vuelve a enviarlo.';

export function looksIdentifying(text: string): boolean {
	if (EMAIL.test(text) || CURP.test(text)) return true;
	const runs = text.match(DIGIT_RUN) ?? [];
	return runs.some((run) => run.replace(/\D/g, '').length >= 8);
}

export function isoWeek(date: Date): string {
	const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
	const weekday = utc.getUTCDay() || 7;
	utc.setUTCDate(utc.getUTCDate() + 4 - weekday);
	const yearStart = Date.UTC(utc.getUTCFullYear(), 0, 1);
	const week = Math.ceil(((utc.getTime() - yearStart) / 86_400_000 + 1) / 7);
	return `${utc.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

let currentDay = '';
let dailySalt = '';
let counters = new Map<string, number>();

function toHex(bytes: Uint8Array): string {
	return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function rotateIfNeeded(now: Date): void {
	const day = now.toISOString().slice(0, 10);
	if (day === currentDay) return;
	currentDay = day;
	dailySalt = toHex(crypto.getRandomValues(new Uint8Array(16)));
	counters = new Map();
}

async function counterKey(clinicId: string, ip: string, userAgent: string): Promise<string> {
	const input = new TextEncoder().encode(`${ip}|${userAgent}|${dailySalt}`);
	const digest = await crypto.subtle.digest('SHA-256', input);
	return `${clinicId}:${toHex(new Uint8Array(digest))}`;
}

export async function isRateLimited(
	clinicId: string,
	ip: string,
	userAgent: string,
	now = new Date()
): Promise<boolean> {
	rotateIfNeeded(now);
	const key = await counterKey(clinicId, ip, userAgent);
	return (counters.get(key) ?? 0) >= MAX_SUBMISSIONS_PER_DAY;
}

export async function recordSubmission(
	clinicId: string,
	ip: string,
	userAgent: string,
	now = new Date()
): Promise<void> {
	rotateIfNeeded(now);
	const key = await counterKey(clinicId, ip, userAgent);
	counters.set(key, (counters.get(key) ?? 0) + 1);
}
