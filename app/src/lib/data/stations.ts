import type { Station } from '#lib/types.ts';

export const stations: Station[] = [
	{
		id: 'metro-zocalo-tenochtitlan',
		name: 'Zócalo/Tenochtitlan',
		system: 'metro',
		lines: ['2'],
		borough: 'Cuauhtémoc',
		location: { latitude: 19.4325, longitude: -99.1322452 }
	},
	{
		id: 'metro-pino-suarez',
		name: 'Pino Suárez',
		system: 'metro',
		lines: ['1', '2'],
		borough: 'Cuauhtémoc',
		location: { latitude: 19.4259177, longitude: -99.1330004 }
	},
	{
		id: 'metro-hidalgo',
		name: 'Hidalgo',
		system: 'metro',
		lines: ['2', '3'],
		borough: 'Cuauhtémoc',
		location: { latitude: 19.4374065, longitude: -99.1466643 }
	},
	{
		id: 'metro-balderas',
		name: 'Balderas',
		system: 'metro',
		lines: ['1', '3'],
		borough: 'Cuauhtémoc',
		location: { latitude: 19.4271218, longitude: -99.1489658 }
	},
	{
		id: 'metro-centro-medico',
		name: 'Centro Médico',
		system: 'metro',
		lines: ['3', '9'],
		borough: 'Cuauhtémoc',
		location: { latitude: 19.4065257, longitude: -99.1551569 }
	},
	{
		id: 'metro-chapultepec',
		name: 'Chapultepec',
		system: 'metro',
		lines: ['1'],
		borough: 'Cuauhtémoc',
		location: { latitude: 19.420702, longitude: -99.1768378 }
	},
	{
		id: 'metro-tacubaya',
		name: 'Tacubaya',
		system: 'metro',
		lines: ['1', '7', '9'],
		borough: 'Miguel Hidalgo',
		location: { latitude: 19.402049, longitude: -99.1874725 }
	},
	{
		id: 'metro-mixcoac',
		name: 'Mixcoac',
		system: 'metro',
		lines: ['7', '12'],
		borough: 'Benito Juárez',
		location: { latitude: 19.3760926, longitude: -99.1872408 }
	},
	{
		id: 'metro-zapata',
		name: 'Zapata',
		system: 'metro',
		lines: ['3', '12'],
		borough: 'Benito Juárez',
		location: { latitude: 19.3706696, longitude: -99.1648064 }
	},
	{
		id: 'metro-general-anaya',
		name: 'General Anaya',
		system: 'metro',
		lines: ['2'],
		borough: 'Coyoacán',
		location: { latitude: 19.3534, longitude: -99.1451 }
	},
	{
		id: 'metro-tasquena',
		name: 'Tasqueña',
		system: 'metro',
		lines: ['2'],
		borough: 'Coyoacán',
		location: { latitude: 19.3437579, longitude: -99.1396585 }
	},
	{
		id: 'metro-copilco',
		name: 'Copilco',
		system: 'metro',
		lines: ['3'],
		borough: 'Coyoacán',
		location: { latitude: 19.3360586, longitude: -99.1770655 }
	},
	{
		id: 'metro-universidad',
		name: 'Universidad',
		system: 'metro',
		lines: ['3'],
		borough: 'Coyoacán',
		location: { latitude: 19.3244753, longitude: -99.1739054 }
	},
	{
		id: 'metro-la-raza',
		name: 'La Raza',
		system: 'metro',
		lines: ['3', '5'],
		borough: 'Gustavo A. Madero',
		location: { latitude: 19.4687443, longitude: -99.139518 }
	},
	{
		id: 'metro-politecnico',
		name: 'Politécnico',
		system: 'metro',
		lines: ['5'],
		borough: 'Gustavo A. Madero',
		location: { latitude: 19.5006199, longitude: -99.1491893 }
	},
	{
		id: 'metro-pantitlan',
		name: 'Pantitlán',
		system: 'metro',
		lines: ['1', '5', '9', 'A'],
		borough: 'Venustiano Carranza',
		location: { latitude: 19.4152415, longitude: -99.0745031 }
	},
	{
		id: 'metro-constitucion-de-1917',
		name: 'Constitución de 1917',
		system: 'metro',
		lines: ['8'],
		borough: 'Iztapalapa',
		location: { latitude: 19.3459153, longitude: -99.0637399 }
	},
	{
		id: 'metrobus-buenavista',
		name: 'Buenavista',
		system: 'metrobus',
		lines: ['1', '3', '4'],
		borough: 'Cuauhtémoc',
		location: { latitude: 19.4448305, longitude: -99.1523096 }
	},
	{
		id: 'metrobus-ciudad-universitaria',
		name: 'Ciudad Universitaria',
		system: 'metrobus',
		lines: ['1'],
		borough: 'Coyoacán',
		location: { latitude: 19.3241266, longitude: -99.1894904 }
	},
	{
		id: 'tren-ligero-tasquena',
		name: 'Tasqueña',
		system: 'tren-ligero',
		lines: ['TL'],
		borough: 'Coyoacán',
		location: { latitude: 19.3436739, longitude: -99.1404751 }
	},
	{
		id: 'tren-ligero-xochimilco',
		name: 'Xochimilco',
		system: 'tren-ligero',
		lines: ['TL'],
		borough: 'Xochimilco',
		location: { latitude: 19.25946, longitude: -99.1081278 }
	},
	{
		id: 'cablebus-campos-revolucion',
		name: 'Campos Revolución',
		system: 'cablebus',
		lines: ['1'],
		borough: 'Gustavo A. Madero',
		location: { latitude: 19.5405877, longitude: -99.1420039 }
	},
	{
		id: 'cablebus-indios-verdes',
		name: 'Indios Verdes',
		system: 'cablebus',
		lines: ['1'],
		borough: 'Gustavo A. Madero',
		location: { latitude: 19.4952232, longitude: -99.1221637 }
	},
	{
		id: 'cablebus-constitucion-de-1917',
		name: 'Constitución de 1917',
		system: 'cablebus',
		lines: ['2'],
		borough: 'Iztapalapa',
		location: { latitude: 19.344877, longitude: -99.0625305 }
	},
	{
		id: 'cablebus-santa-marta',
		name: 'Santa Marta',
		system: 'cablebus',
		lines: ['2'],
		borough: 'Iztapalapa',
		location: { latitude: 19.3595517, longitude: -98.9940041 }
	}
];
