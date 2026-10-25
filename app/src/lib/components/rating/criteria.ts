export const CRITERIA = [
	{ key: 'non_judgmental', label: 'Trato sin juicios' },
	{ key: 'clear_information', label: 'Información clara sobre el procedimiento' },
	{ key: 'privacy', label: 'Privacidad y confidencialidad' },
	{ key: 'waiting_time', label: 'Tiempo de espera' },
	{ key: 'free_of_charge', label: 'Atención gratuita' },
	{ key: 'ease_of_access', label: 'Facilidad para llegar' }
] as const;

export type CriterionKey = (typeof CRITERIA)[number]['key'];

export type RatingScores = Partial<Record<CriterionKey, number>>;

export interface RatingSubmission {
	clinicId: string;
	scores: RatingScores;
	comment?: string;
}

export interface RatingSummary {
	enough: boolean;
	count?: number;
	averages?: Partial<Record<CriterionKey, number>>;
}

export interface ApprovedComment {
	text: string;
	week: string;
}

export interface RatingsResponse {
	summary: RatingSummary;
	comments: ApprovedComment[];
}

export const MAX_COMMENT_LENGTH = 500;
export const MIN_RATINGS_FOR_SUMMARY = 5;
export const MAX_SUBMISSIONS_PER_DAY = 3;
