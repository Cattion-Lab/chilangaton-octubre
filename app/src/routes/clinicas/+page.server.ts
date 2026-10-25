import { clinics } from '#lib/data/clinics.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	return { clinics, canonical: `${url.origin}/clinicas` };
};
