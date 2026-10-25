import { clinics } from '#lib/data/clinics.ts';

export type Piece = { text: string; href?: string };
export type Block = { kind: 'paragraph'; pieces: Piece[] } | { kind: 'list'; items: Piece[][] };

const SITE_PATHS = new Set(['/consultar', '/clinicas', '/datos', '/privacidad', '/preguntar']);
const CLINIC_PATHS = new Set(clinics.map((clinic) => `/clinicas/${clinic.id}`));
const INLINE = /\[([^\]\n]{1,200})\]\((\/[\w\-/]*)\)|(\/clinicas\/[a-z0-9-]+)/g;

function isKnownPath(path: string): boolean {
	return SITE_PATHS.has(path) || CLINIC_PATHS.has(path);
}

function clean(text: string): string {
	return text.replace(/\*\*|__|`/g, '').replace(/^#{1,6}\s+/, '');
}

function toPieces(line: string): Piece[] {
	const pieces: Piece[] = [];
	let last = 0;
	for (const match of line.matchAll(INLINE)) {
		const start = match.index ?? 0;
		if (start > last) pieces.push({ text: clean(line.slice(last, start)) });
		const label = match[1];
		const path = match[2] ?? match[3] ?? '';
		if (isKnownPath(path)) {
			pieces.push({ text: clean(label ?? path), href: path });
		} else {
			pieces.push({ text: clean(label ?? path) });
		}
		last = start + match[0].length;
	}
	if (last < line.length) pieces.push({ text: clean(line.slice(last)) });
	return pieces;
}

export function parseReply(source: string): Block[] {
	const blocks: Block[] = [];
	let items: Piece[][] | null = null;
	for (const raw of source.split('\n')) {
		const line = raw.trim();
		const bullet = /^[-•*]\s+(.*)$/.exec(line);
		if (bullet) {
			items ??= [];
			items.push(toPieces(bullet[1] ?? ''));
			if (items.length === 1) blocks.push({ kind: 'list', items });
			continue;
		}
		items = null;
		if (line === '') continue;
		blocks.push({ kind: 'paragraph', pieces: toPieces(line) });
	}
	return blocks;
}
