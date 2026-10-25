import { listDocuments } from '#lib/content/fundamentos.ts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = () => ({ documents: listDocuments() });
