import { dev } from '$app/env';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '$app/env/private';
import type { ApprovedComment, RatingScores, RatingSummary } from '#lib/components/rating/criteria.ts';
import { createMemoryStore } from './memory-store.ts';
import { createSupabaseStore } from './supabase-store.ts';

export interface NewRating {
	clinicId: string;
	scores: RatingScores;
	comment: string | null;
	commentStatus: 'none' | 'pending';
	week: string;
}

export interface RatingsStore {
	submit(rating: NewRating): Promise<void>;
	summary(clinicId: string): Promise<RatingSummary>;
	approvedComments(clinicId: string): Promise<ApprovedComment[]>;
}

let store: RatingsStore | undefined;

export const ratingsAvailable: boolean = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY) || dev;

export function getRatingsStore(): RatingsStore {
	if (!store) {
		if (SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY) {
			store = createSupabaseStore(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
		} else if (dev) {
			store = createMemoryStore();
		} else {
			throw new Error('Las calificaciones necesitan SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY en producción.');
		}
	}
	return store;
}
