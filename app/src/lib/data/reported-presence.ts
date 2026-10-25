import type { LatLng } from '#lib/types.ts';

export interface ReportedZone {
	id: string;
	label: string;
	location: LatLng;
	source: string;
	sourceUrl: string;
	reportedOn: string;
	frequent?: boolean;
}

const SILLA_ROTA = 'La Silla Rota';
const SILLA_ROTA_URL =
	'https://lasillarota.com/metropoli/2026/3/23/marchas-concentraciones-cierres-viales-hoy-23-de-marzo-en-cdmx-591494.html';
const SILLA_ROTA_DATE = '23-mar-2026';

export const reportedPresence: ReportedZone[] = [
	{
		id: 'vigilia-pedregal',
		label: 'Vigilias frente a Marie Stopes Pedregal (Periférico Sur 4829, ubicación aproximada)',
		location: { latitude: 19.3028206, longitude: -99.1859758 },
		source: SILLA_ROTA,
		sourceUrl: SILLA_ROTA_URL,
		reportedOn: SILLA_ROTA_DATE
	},
	{
		id: 'vigilia-roma-sur-manzanillo',
		label: 'Vigilias frente a Marie Stopes Roma Sur (Manzanillo 49)',
		location: { latitude: 19.40719, longitude: -99.1651235 },
		source: SILLA_ROTA,
		sourceUrl: SILLA_ROTA_URL,
		reportedOn: SILLA_ROTA_DATE,
		frequent: true
	},
	{
		id: 'vigilia-coyoacan',
		label: 'Vigilias frente a Marie Stopes Coyoacán (Miguel Ángel de Quevedo 1098)',
		location: { latitude: 19.3427561, longitude: -99.1480377 },
		source: SILLA_ROTA,
		sourceUrl: SILLA_ROTA_URL,
		reportedOn: SILLA_ROTA_DATE,
		frequent: true
	},
	{
		id: 'vigilia-condesa',
		label: 'Vigilias frente a Marie Stopes Condesa (Atlixco 12)',
		location: { latitude: 19.4155902, longitude: -99.1727054 },
		source: SILLA_ROTA,
		sourceUrl: SILLA_ROTA_URL,
		reportedOn: SILLA_ROTA_DATE
	},
	{
		id: 'vigilia-roma-sur-tlacotalpan',
		label: 'Vigilias frente a Marie Stopes Roma Sur (Tlacotalpan 39)',
		location: { latitude: 19.4074511, longitude: -99.1668637 },
		source: SILLA_ROTA,
		sourceUrl: SILLA_ROTA_URL,
		reportedOn: SILLA_ROTA_DATE
	},
	{
		id: 'modulo-cam-mexico-espana',
		label: 'Módulo externo frente al Centro de Salud México-España',
		location: { latitude: 19.4498364, longitude: -99.1821626 },
		source: 'Los Angeles Times',
		sourceUrl:
			'https://www.latimes.com/espanol/mexico/articulo/2021-10-19/these-clinics-in-mexico-are-trying-to-stop-abortions-by-duping-women',
		reportedOn: '2021'
	}
];

export const ROTATING_SITES_NOTE =
	'También se reportan vigilias rotativas en Iztapalapa, Azcapotzalco, Pedregal y La Villa (Cuaresma y otoño).';
