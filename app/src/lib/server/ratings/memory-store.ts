import {
	CRITERIA,
	MIN_RATINGS_FOR_SUMMARY,
	type ApprovedComment,
	type CriterionKey,
	type RatingSummary
} from '#lib/components/rating/criteria.ts';
import type { NewRating, RatingsStore } from './store.ts';

interface StoredRating extends NewRating {
	approved: boolean;
}

export function createMemoryStore(): RatingsStore {
	const ratings: StoredRating[] = [];

	return {
		async submit(rating) {
			ratings.push({ ...rating, approved: false });
		},

		async summary(clinicId): Promise<RatingSummary> {
			const own = ratings.filter((item) => item.clinicId === clinicId);
			if (own.length < MIN_RATINGS_FOR_SUMMARY) return { enough: false };

			const averages: Partial<Record<CriterionKey, number>> = {};
			for (const { key } of CRITERIA) {
				const values = own.flatMap((item) => (item.scores[key] === undefined ? [] : [item.scores[key]]));
				if (values.length === 0) continue;
				const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
				averages[key] = Math.round(mean * 10) / 10;
			}
			return { enough: true, count: own.length, averages };
		},

		async approvedComments(clinicId): Promise<ApprovedComment[]> {
			return ratings
				.filter((item) => item.clinicId === clinicId && item.approved && item.comment)
				.map((item) => ({ text: item.comment as string, week: item.week }))
				.reverse();
		}
	};
}
