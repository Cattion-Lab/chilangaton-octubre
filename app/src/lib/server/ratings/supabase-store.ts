import type { ApprovedComment, RatingSummary } from '#lib/components/rating/criteria.ts';
import type { NewRating, RatingsStore } from './store.ts';

interface CommentRow {
	comment: string;
	week: string;
}

export function createSupabaseStore(url: string, publishableKey: string): RatingsStore {
	const base = url.replace(/\/+$/, '');

	async function rpc(name: string, args: Record<string, unknown>): Promise<Response> {
		const response = await fetch(`${base}/rest/v1/rpc/${name}`, {
			method: 'POST',
			headers: { apikey: publishableKey, 'Content-Type': 'application/json' },
			body: JSON.stringify(args)
		});
		if (!response.ok) throw new Error(`Supabase respondió ${response.status}`);
		return response;
	}

	return {
		async submit(rating: NewRating) {
			await rpc('submit_rating', {
				p_clinic_id: rating.clinicId,
				p_scores: rating.scores,
				p_comment: rating.comment
			});
		},

		async summary(clinicId): Promise<RatingSummary> {
			const response = await rpc('rating_summary', { p_clinic_id: clinicId });
			return (await response.json()) as RatingSummary;
		},

		async approvedComments(clinicId): Promise<ApprovedComment[]> {
			const response = await rpc('approved_comments', { p_clinic_id: clinicId });
			const rows = (await response.json()) as CommentRow[];
			return rows.map((row) => ({ text: row.comment, week: row.week }));
		}
	};
}
