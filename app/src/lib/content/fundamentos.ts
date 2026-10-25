import { Marked, type Token, type Tokens } from 'marked';

const files = import.meta.glob<string>('./fundamentos/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

export interface DocumentLink {
	label: string;
	href: string;
}

export interface DocumentHeading {
	id: string;
	text: string;
	depth: 2 | 3;
}

export interface DocumentSummary {
	slug: string;
	title: string;
	summary: string;
}

export interface FundamentosDocument extends DocumentSummary {
	html: string;
	headings: DocumentHeading[];
	officialLink?: DocumentLink;
}

interface Source {
	slug: string;
	file: string;
	title?: string;
	summaryAfter?: string;
	officialLink?: DocumentLink;
}

const SOURCES: Source[] = [
	{
		slug: 'recopilacion',
		file: 'recopilacion.md',
		title: 'RUTA LIBRE: Movilidad para decidir',
		summaryAfter: '1. Presentación del proyecto'
	},
	{
		slug: 'fuerzas-motoras',
		file: 'investigacion-fuerzas-motoras.md',
		summaryAfter: 'Resumen ejecutivo'
	},
	{
		slug: 'vigilias',
		file: 'recopilacion-vigilias.md',
		title: 'Vigilias frente a clínicas de aborto',
		summaryAfter: 'Fecha de inicio'
	},
	{
		slug: 'lineamiento-2026',
		file: 'lineamiento-2026-para-el-chat.md',
		title: 'Lineamiento técnico para la atención del aborto seguro en México, Edición 2026',
		summaryAfter: '1.1 Postura',
		officialLink: {
			label: 'Descargar el Lineamiento',
			href: 'https://www.gob.mx/cms/uploads/attachment/file/1105568/Lineamientos_VF_2026-CNEGSSR_DIGITAL.pdf'
		}
	},
	{
		slug: 'cartilla-cndh',
		file: 'cartilla-cndh-para-el-chat.md',
		summaryAfter: 'Derechos que más importan',
		officialLink: {
			label: 'Consultar la Cartilla',
			href: 'https://www.cndh.org.mx/sites/default/files/doc/Programas/VIH/Divulgacion/cartillas/Cartilla-Derechos-Sexuales-Adolescentes-Jovenes.pdf'
		}
	}
];

export const documentSlugs = SOURCES.map((source) => source.slug);

const SUMMARY_MAX = 240;
const cache = new Map<string, FundamentosDocument>();

function unescapeHtml(text: string): string {
	return text
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, '&');
}

function escapeAttribute(text: string): string {
	return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function inlineText(tokens: Token[] | undefined): string {
	if (!tokens) return '';
	return tokens
		.map((token) => {
			if ('tokens' in token && token.tokens) return inlineText(token.tokens);
			return 'text' in token && typeof token.text === 'string' ? token.text : token.raw;
		})
		.join('');
}

function plain(tokens: Token[] | undefined): string {
	return unescapeHtml(inlineText(tokens)).replace(/\s+/g, ' ').trim();
}

function slugify(text: string): string {
	const slug = text
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return slug === '' ? 'seccion' : slug;
}

function firstSentences(text: string): string {
	if (text.length <= SUMMARY_MAX) return text;
	const sentences = text.split(/(?<=[.!?])(?<!\bp\.)\s+(?=[A-ZÁÉÍÓÚ¿¡«])/);
	let result = sentences[0] ?? text;
	for (const sentence of sentences.slice(1)) {
		if (`${result} ${sentence}`.length > SUMMARY_MAX) break;
		result = `${result} ${sentence}`;
	}
	return result;
}

function firstText(tokens: Token[]): string {
	for (const token of tokens) {
		if (token.type === 'paragraph') return plain((token as Tokens.Paragraph).tokens);
		if (token.type === 'list') {
			const item = (token as Tokens.List).items[0];
			return item ? plain(item.tokens) : '';
		}
	}
	return '';
}

function pickSummary(tokens: Token[], source: Source): string {
	if (source.summaryAfter) {
		const after = source.summaryAfter;
		const index = tokens.findIndex((token) => token.type === 'heading' && plain((token as Tokens.Heading).tokens).includes(after));
		if (index !== -1) {
			const text = firstText(tokens.slice(index + 1));
			if (text) return firstSentences(text);
		}
	}

	const paragraphs = tokens.filter((token): token is Tokens.Paragraph => token.type === 'paragraph');
	const fallback = paragraphs.find((paragraph) => plain(paragraph.tokens).split(' ').length >= 15);
	return fallback ? firstSentences(plain(fallback.tokens)) : '';
}

function build(source: Source): FundamentosDocument {
	const raw = files[`./fundamentos/${source.file}`];
	if (typeof raw !== 'string') throw new Error(`Falta el documento ${source.file}`);

	const parser = new Marked({ gfm: true });
	const tokens = parser.lexer(raw);

	const titleIndex = tokens.findIndex((token) => token.type === 'heading' && token.depth === 1);
	const titleToken = titleIndex === -1 ? undefined : (tokens[titleIndex] as Tokens.Heading);
	const title = source.title ?? (titleToken ? plain(titleToken.tokens) : source.slug);
	if (titleIndex !== -1) tokens.splice(titleIndex, 1);

	const summary = pickSummary(tokens, source);

	const found: Tokens.Heading[] = [];
	parser.walkTokens(tokens, (token) => {
		if (token.type === 'heading') found.push(token as Tokens.Heading);
	});
	const minDepth = found.reduce((min, heading) => Math.min(min, heading.depth), 6);
	const shift = found.length === 0 ? 0 : 2 - minDepth;

	const used = new Map<string, number>();
	const ids = found.map((heading) => {
		const base = slugify(plain(heading.tokens));
		const count = (used.get(base) ?? 0) + 1;
		used.set(base, count);
		return count === 1 ? base : `${base}-${count}`;
	});

	const headings: DocumentHeading[] = found.flatMap((heading, index) => {
		const depth = Math.min(6, Math.max(2, heading.depth + shift));
		return depth <= 3 ? [{ id: ids[index], text: plain(heading.tokens), depth: depth as 2 | 3 }] : [];
	});

	let position = 0;
	const renderer = new Marked({
		gfm: true,
		renderer: {
			heading(token) {
				const depth = Math.min(6, Math.max(2, token.depth + shift));
				const id = ids[position++];
				return `<h${depth} id="${id}">${this.parser.parseInline(token.tokens)}</h${depth}>\n`;
			},
			link(token) {
				const text = this.parser.parseInline(token.tokens);
				const title = token.title ? ` title="${escapeAttribute(token.title)}"` : '';
				const external = /^https?:/i.test(token.href) ? ' rel="noopener"' : '';
				return `<a href="${escapeAttribute(token.href)}"${title}${external}>${text}</a>`;
			}
		}
	});

	const html = renderer
		.parser(tokens)
		.replace(/<table>/g, '<div class="table-wrap" role="region" aria-label="Tabla desplazable" tabindex="0"><table>')
		.replace(/<\/table>/g, '</table></div>');

	return { slug: source.slug, title, summary, html, headings, officialLink: source.officialLink };
}

export function getDocument(slug: string): FundamentosDocument | undefined {
	const source = SOURCES.find((item) => item.slug === slug);
	if (!source) return undefined;
	const cached = cache.get(slug);
	if (cached) return cached;
	const document = build(source);
	cache.set(slug, document);
	return document;
}

export function listDocuments(): DocumentSummary[] {
	return documentSlugs.flatMap((slug) => {
		const document = getDocument(slug);
		return document ? [{ slug: document.slug, title: document.title, summary: document.summary }] : [];
	});
}
