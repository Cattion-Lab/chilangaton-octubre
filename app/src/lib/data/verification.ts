import { clinics } from '#lib/data/clinics.ts';
import type { Clinic } from '#lib/types.ts';

function isVerified(clinic: Clinic): boolean {
	return clinic.verificationStatus === 'verificada' && clinic.verifiedAt !== null;
}

function latestDate(): string | null {
	let latest: string | null = null;
	for (const clinic of clinics) {
		if (!isVerified(clinic) || clinic.verifiedAt === null) continue;
		if (Number.isNaN(Date.parse(clinic.verifiedAt))) continue;
		if (latest === null || Date.parse(clinic.verifiedAt) > Date.parse(latest)) {
			latest = clinic.verifiedAt;
		}
	}
	return latest;
}

export const latestVerifiedAt: string | null = latestDate();
export const verifiedCount: number = clinics.filter(isVerified).length;
export const pendingCount: number = clinics.length - verifiedCount;

const dateFormat = new Intl.DateTimeFormat('es-MX', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: 'UTC'
});

export function formatVerificationDate(value: string): string {
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? value : dateFormat.format(date);
}

export function isClinicVerified(clinic: Clinic): boolean {
	return isVerified(clinic);
}
