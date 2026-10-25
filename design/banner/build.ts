import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

type Params = Record<string, unknown>;
type Step = readonly [command: string, params: Params];
type Point = readonly [number, number];

interface StepResult {
  readonly command: string;
  readonly result: unknown;
}

const ROOT = new URL('../../', import.meta.url).pathname;
const FONTS = join(ROOT, 'design/fonts');
const SOURCE = join(ROOT, 'design/banner/banner.vectorcraft');
const OUT_DIR = join(ROOT, 'docs/assets');
const IMAGE = 'ubuntu:24.04';

const WIDTH = 1280;
const HEIGHT = 400;

const CREAM = '#f7ebe4';
const INK = '#3a1e12';
const SUN = '#f2b630';
const GUINDA = '#9d2449';
const PINE = '#1e5b45';
const LEAF = '#8dbe3f';
const WHITE = '#fffaf6';

const DESTINATION: Point = [1068, 206];

const round = (value: number): number => Math.round(value * 100) / 100;

function polyline(points: readonly Point[]): string {
  return points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${round(x)} ${round(y)}`).join(' ');
}

class VectorDoc {
  readonly steps: Step[] = [];

  constructor(name: string) {
    this.steps.push(['file.new', { name, width: WIDTH, height: HEIGHT, units: 'Pixels', backgroundContents: 'transparent' }]);
  }

  rect(x: number, y: number, width: number, height: number, fill: string, radius = 0): this {
    this.steps.push(
      ['shape.rectangle', { x, y, width, height, ...(radius ? { radius } : {}) }],
      ['paint.setFill', { color: fill }],
      ['paint.setStroke', { none: true }],
    );
    return this;
  }

  circle(cx: number, cy: number, r: number, fill: string, stroke?: { color: string; weight: number }): this {
    this.steps.push(['shape.ellipse', { x: round(cx - r), y: round(cy - r), width: r * 2, height: r * 2 }], ['paint.setFill', { color: fill }]);
    if (stroke) this.steps.push(['paint.setStroke', { color: stroke.color }], ['stroke.set', { weight: stroke.weight, align: 'center' }]);
    else this.steps.push(['paint.setStroke', { none: true }]);
    return this;
  }

  line(points: readonly Point[], color: string, weight: number, dash?: readonly number[]): this {
    this.steps.push(
      ['path.create', { d: polyline(points) }],
      ['paint.setFill', { none: true }],
      ['paint.setStroke', { color }],
      ['stroke.set', { weight, cap: 'round', join: 'round', ...(dash ? { dash } : {}) }],
    );
    return this;
  }

  text(content: string, box: { x: number; y: number; width: number; height: number }, style: { font: string; fontStyle: string; size: number; color: string; tracking?: number; justify?: string }): this {
    this.steps.push(
      ['text.create', { x: box.x, y: box.y, text: content, size: style.size, font: style.font, style: style.fontStyle, color: style.color, area: { width: box.width, height: box.height, fit: 'none' } }],
      ['text.setStyle', { tracking: style.tracking ?? 0, justify: style.justify ?? 'left', leading: style.size }],
      ['text.areaOptions', {}],
    );
    return this;
  }
}

function bannerDoc(): VectorDoc {
  const doc = new VectorDoc('banner');
  doc.rect(0, 0, WIDTH, HEIGHT, CREAM);

  const [dx, dy] = DESTINATION;
  doc.line([[WIDTH + 20, 64], [dx + 142, 64], [dx, dy]], PINE, 16);
  doc.line([[800, HEIGHT + 20], [800, 338], [932, dy], [dx, dy]], LEAF, 16);
  doc.line([[WIDTH + 20, 348], [dx + 142, 348], [dx, dy]], GUINDA, 16);
  doc.line([[930, -20], [930, 68], [dx, dy]], SUN, 10, [0, 22]);

  const station = { color: INK, weight: 5 };
  doc.circle(dx + 142, 64, 10, WHITE, station);
  doc.circle(800, 338, 10, WHITE, station);
  doc.circle(932, dy, 10, WHITE, station);
  doc.circle(dx + 142, 348, 10, WHITE, station);

  const rays: readonly (readonly [Point, Point])[] = [
    [[dx - 58, dy + 40], [dx - 76, dy + 54]],
    [[dx + 2, dy - 66], [dx + 2, dy - 88]],
    [[dx + 58, dy - 40], [dx + 76, dy - 54]],
  ];
  for (const [from, to] of rays) doc.line([from, to], SUN, 8);
  doc.circle(dx, dy, 32, WHITE, { color: INK, weight: 8 });
  doc.circle(dx, dy, 14, GUINDA);

  doc.rect(72, 70, 520, 42, GUINDA, 21);
  doc.text('CHILANGATÓN 2026 · LABORATORIO DE FUTUROS', { x: 72, y: 81, width: 520, height: 26 }, { font: 'Rubik', fontStyle: 'Bold', size: 17, color: WHITE, tracking: 60, justify: 'center' });

  const title = { x: 70, y: 140, width: 960, height: 220 };
  const titleStyle = { font: 'Bowlby One SC', fontStyle: 'Regular', size: 88 };
  doc.text('RUTA LIBRE', { ...title, x: title.x + 7, y: title.y + 7 }, { ...titleStyle, color: SUN });
  doc.text('RUTA LIBRE', title, { ...titleStyle, color: INK });

  doc.text('Movilidad segura para decidir', { x: 74, y: 284, width: 700, height: 44 }, { font: 'Rubik', fontStyle: 'Medium', size: 34, color: GUINDA });
  return doc;
}

function runVectorCraft(engine: string, steps: readonly Step[]): StepResult[] {
  const args = [
    'run', '--rm', '-i', '--network', 'none', '--cpus', '1', '--memory', '1g', '--user', '65534:65534', '-e', 'HOME=/tmp', '-w', '/tmp',
    '-v', `${engine}:/opt/vc:ro`, '-v', `${FONTS}:/usr/share/fonts/studio:ro`,
    IMAGE, '/opt/vc/bin/vectorcraft-cli', 'run',
    ...steps.flatMap(([command, params]) => ['--cmd', command, '--params', JSON.stringify(params)]),
  ];
  const run = spawnSync('docker', args, { encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 });
  const results: StepResult[] = [];
  for (const line of run.stdout.split('\n').filter((row) => row.trim().startsWith('{'))) {
    const parsed = JSON.parse(line) as { command?: string; result?: unknown; error?: unknown };
    if (parsed.error) throw new Error(`VectorCraft falló en ${parsed.command}: ${JSON.stringify(parsed.error).slice(0, 600)}`);
    results.push({ command: parsed.command ?? '', result: parsed.result });
  }
  if (run.status !== 0) throw new Error(`VectorCraft salió con ${run.status}: ${run.stderr.trim().slice(0, 800)}`);
  if (results.length !== steps.length) throw new Error(`VectorCraft contestó ${results.length} pasos de ${steps.length}`);
  return results;
}

const engine = process.env['VECTORCRAFT_HOME'];
if (!engine || !existsSync(join(engine, 'bin/vectorcraft-cli'))) {
  console.error('Falta VECTORCRAFT_HOME: la carpeta de VectorCraft 0.8.0 para Linux (con bin/vectorcraft-cli)');
  process.exit(2);
}

const doc = bannerDoc();
const svg = { minify: true, decimals: 1, objectIds: 'minimal', metadata: false };
const outputs = [
  { file: SOURCE, params: { format: 'vectorcraft' } },
  { file: join(OUT_DIR, 'banner.png'), params: { format: 'png', scale: 2 } },
];
const steps: Step[] = [
  ...doc.steps,
  ['text.fonts', {}],
  ['select.none', {}],
  ...outputs.map(({ params }): Step => ['file.export', params]),
  ['select.all', {}],
  ['type.createOutlines', {}],
  ['select.none', {}],
  ['file.export', { format: 'svg', svg }],
];

const started = Date.now();
const results = runVectorCraft(engine, steps);
for (const area of results.filter((step) => step.command === 'text.areaOptions')) {
  if ((area.result as { overflow?: boolean }).overflow) throw new Error(`Un texto no cabe en su caja: ${JSON.stringify(area.result)}`);
}
const fontReport = results.find((step) => step.command === 'text.fonts');
for (const font of (fontReport?.result ?? []) as { family: string; status: string; missingGlyphs: number }[]) {
  if (font.status !== 'exact' || font.missingGlyphs !== 0) throw new Error(`Fuente incompleta: ${JSON.stringify(font)}`);
}

mkdirSync(OUT_DIR, { recursive: true });
const targets = [...outputs.map(({ file }) => file), join(OUT_DIR, 'banner.svg')];
const exported = results.filter((step) => step.command === 'file.export');
targets.forEach((file, index) => {
  const data = (exported[index]?.result as { dataBase64?: string } | undefined)?.dataBase64;
  if (!data) throw new Error(`Falta la exportación ${file}`);
  const bytes = Buffer.from(data, 'base64');
  writeFileSync(file, bytes);
  console.log(`${file.replace(ROOT, '')}: ${bytes.length} bytes`);
});
console.log(`listo en ${((Date.now() - started) / 1000).toFixed(1)} s`);
