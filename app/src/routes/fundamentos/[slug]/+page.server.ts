import { error } from '@sveltejs/kit';
import { documentSlugs, getDocument } from '#lib/content/fundamentos.ts';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => documentSlugs.map((slug) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
	const document = getDocument(params.slug);
	if (!document) error(404, 'No encontramos este documento.');
	return { document };
};
