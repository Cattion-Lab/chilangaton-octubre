import type { Clinic } from '#lib/types.ts';

const SOURCE_NAME = 'Secretaría de Salud de la Ciudad de México, directorio ILE';

const GENERAL_REQUIREMENTS = [
	'Personas mayores de edad: identificación oficial (INE, pasaporte vigente, cédula profesional o constancia de identidad) en original y copia',
	'CURP',
	'Comprobante de domicilio en original y copia (último recibo de predial, luz, agua, gas, televisión de paga, teléfono fijo o internet)',
	'Personas menores de edad: acta de nacimiento, CURP, credencial de la escuela, certificado de estudios o pasaporte vigente, comprobante de domicilio y acompañamiento de madre, padre o tutor con identificación oficial',
	'Si falta algún documento, el personal de la unidad ofrece opciones',
	'El límite para la ILE es de 12 semanas completas de embarazo'
];

const MEDICATED = ['Interrupción legal del embarazo (ILE)', 'Consejería', 'Métodos anticonceptivos', 'Procedimiento medicado'];

const MEDICATED_AND_SURGICAL = [...MEDICATED, 'Procedimiento quirúrgico'];

export const clinics: Clinic[] = [
	{
		id: 'ile-cs-cuajimalpa',
		name: 'Centro de Salud T-III Cuajimalpa',
		kind: 'ile-publica',
		address:
			'Av. y Cda. Juárez s/n, Col. Cuajimalpa, C.P. 05000, Cuajimalpa de Morelos (a un lado de la Secundaria 19 «Dolores Ángela Castillo»)',
		borough: 'Cuajimalpa de Morelos',
		location: { latitude: 19.3566912, longitude: -99.2974094 },
		hours: 'Miércoles a viernes; la atención inicia a las 7:00 am',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Ir con disponibilidad de tiempo, porque la atención es integral',
			'Pedir consulta del servicio de ILE y ultrasonido en el archivo clínico'
		],
		services: MEDICATED,
		phone: '55 5038 1700 ext. 6610',
		sourceName: SOURCE_NAME,
		sourceUrl: 'http://ile.salud.cdmx.gob.mx/centro-de-salud-t-iii-cuajimalpa/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	},
	{
		id: 'ile-clinica-hermila-galindo',
		name: 'Clínica Integral de la Mujer «Hermila Galindo»',
		kind: 'ile-publica',
		address:
			'Av. Ojo de Agua esq. Av. San Jerónimo s/n, Col. Huayatla, C.P. 10360, La Magdalena Contreras',
		borough: 'La Magdalena Contreras',
		location: { latitude: 19.3066, longitude: -99.2657 },
		hours: 'Lunes a viernes; la atención inicia a las 8:00 am (la fuente recomienda llegar a las 7:00 hrs)',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Ir con disponibilidad de tiempo, porque la atención es integral',
			'Dirigirse a la Clínica de Salud Reproductiva'
		],
		services: MEDICATED,
		phone: '55 5038 1700 ext. 7265',
		sourceName: SOURCE_NAME,
		sourceUrl: 'http://ile.salud.cdmx.gob.mx/c-s-ti-clinica-integral-de-la-mujer-hermila-galindo/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	},
	{
		id: 'ile-cs-miguel-hidalgo-tlahuac',
		name: 'Centro de Salud T-III Miguel Hidalgo',
		kind: 'ile-publica',
		address:
			'Calle Fidelio esq. Deodato s/n, Col. Miguel Hidalgo, C.P. 13200, Tláhuac (entre las calles Cenicienta y Deodato)',
		borough: 'Tláhuac',
		location: { latitude: 19.2896835, longitude: -99.0484108 },
		hours: 'Lunes a viernes; la atención inicia a las 7:00 am',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Ir con disponibilidad de tiempo, porque la atención es integral',
			'Pedir consulta del servicio de ILE y ultrasonido en el archivo clínico, a la izquierda al entrar al centro de salud'
		],
		services: MEDICATED,
		phone: '55 5038 1700 ext. 7550',
		sourceName: SOURCE_NAME,
		sourceUrl: 'http://ile.salud.cdmx.gob.mx/centro-de-salud-tiii-miguel-hidalgo/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	},
	{
		id: 'ile-clinica-comunitaria-santa-catarina',
		name: 'Clínica Comunitaria Santa Catarina',
		kind: 'ile-publica',
		address:
			'Calle Nuevo León Mz. 38, Lt. 9, Col. Miguel de la Madrid, C.P. 09698, Iztapalapa (calle Oaxaca, por la farmacia Luna, junto a la Clínica Comunitaria «Santa Catarina»)',
		borough: 'Iztapalapa',
		location: { latitude: 19.3423078, longitude: -99.0023787 },
		hours:
			'Lunes a viernes; la atención inicia a las 7:00 am. La fuente indica: servicio quirúrgico cerrado hasta nuevo aviso',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Ir con disponibilidad de tiempo, porque la atención es integral',
			'Dirigirse a la Clínica de Salud Sexual y Reproductiva, a un costado de la clínica comunitaria, 15 minutos antes de las 7:00 horas'
		],
		services: MEDICATED,
		phone: '55 5038 1700 ext. 6856',
		sourceName: SOURCE_NAME,
		sourceUrl: 'http://ile.salud.cdmx.gob.mx/clinica-comunitaria-santa-catarina/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	},
	{
		id: 'ile-cs-mexico-espana',
		name: 'Centro de Salud T-III México España',
		kind: 'ile-publica',
		address: 'Mariano Escobedo 148, Col. Anáhuac, C.P. 11320, Miguel Hidalgo (entrada por Lago Iseo)',
		borough: 'Miguel Hidalgo',
		location: { latitude: 19.4498364, longitude: -99.1821626 },
		hours: 'Lunes a viernes; la atención inicia a las 7:30 am',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Ir con disponibilidad de tiempo, porque la atención es integral',
			'Dirigirse directamente al servicio de Interrupción Legal del Embarazo'
		],
		services: MEDICATED_AND_SURGICAL,
		phone: '55 5038 1700 ext. 7378',
		sourceName: SOURCE_NAME,
		sourceUrl:
			'http://ile.salud.cdmx.gob.mx/clinica-integral-de-salud-reproductiva-del-centro-de-salud-t-iii-mexico-espana/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	},
	{
		id: 'ile-cs-duque-de-estrada',
		name: 'Centro de Salud T-III Dr. Juan Duque de Estrada',
		kind: 'ile-publica',
		address:
			'Oriente 170 núm. 154, Col. Moctezuma 2da. Sección, C.P. 15500, Venustiano Carranza (entre el Mercado 20 de Abril y Eje 1 Norte)',
		borough: 'Venustiano Carranza',
		location: { latitude: 19.4297523, longitude: -99.0975025 },
		hours:
			'Lunes a domingo, incluidos días festivos; lunes a viernes desde las 7:00 am; sábado, domingo y días festivos de 8:00 a 19:30 horas',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Ir con disponibilidad de tiempo, porque la atención es integral',
			'Dirigirse directamente a la Clínica de Salud Sexual y Reproductiva'
		],
		services: MEDICATED_AND_SURGICAL,
		phone: '55 5038 1700 ext. 7740',
		sourceName: SOURCE_NAME,
		sourceUrl:
			'http://ile.salud.cdmx.gob.mx/clinica-salud-sexual-reproductiva-centro-de-salud-t-iii-dr-juan-duque-de-estrada/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	},
	{
		id: 'ile-cs-beatriz-velasco-aleman',
		name: 'Clínica de Salud Reproductiva del Centro de Salud T-III Beatriz Velasco de Alemán',
		kind: 'ile-publica',
		address:
			'Av. Ing. Eduardo Molina esq. Peluqueros s/n, Col. Michoacana, C.P. 15300, Venustiano Carranza (cerca de la terminal Eduardo Molina del Metrobús Línea 5)',
		borough: 'Venustiano Carranza',
		location: { latitude: 19.445144, longitude: -99.1125909 },
		hours:
			'Lunes a viernes; la atención inicia a las 7:00 am. La fuente indica: servicio quirúrgico cerrado hasta nuevo aviso, y sin servicio sábado, domingo y días festivos hasta nuevo aviso',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Ir con disponibilidad de tiempo, porque la atención es integral',
			'Entrar directamente a la Clínica de Salud Sexual y Reproductiva, que tiene entrada independiente por Av. Eduardo Molina, a un costado de la entrada principal'
		],
		services: MEDICATED,
		phone: '55 5038 1700 ext. 7728',
		sourceName: SOURCE_NAME,
		sourceUrl: 'http://ile.salud.cdmx.gob.mx/clinica-centro-de-salud-t-iii-beatriz-velasco-de-aleman/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	},
	{
		id: 'ile-hospital-general-enrique-cabrera',
		name: 'Hospital General Dr. Enrique Cabrera',
		kind: 'ile-publica',
		address:
			'Prolongación 5 de Mayo núm. 3170, esq. Centenario, Col. Ex Hacienda de Tarango, C.P. 11800, Álvaro Obregón',
		borough: 'Álvaro Obregón',
		location: { latitude: 19.3615305, longitude: -99.2241291 },
		hours: 'Lunes a viernes, de 7:00 a 14:00 horas',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Llegar a las 7:00 horas',
			'Acudir en ayunas y acompañada de una persona adulta',
			'Ir al Módulo de Atención Ciudadana y al archivo clínico de Consulta Externa; el servicio se brinda en Consulta Externa, primer piso'
		],
		services: MEDICATED_AND_SURGICAL,
		phone: '55 1285 7100 ext. 5081',
		sourceName: SOURCE_NAME,
		sourceUrl: 'http://ile.salud.cdmx.gob.mx/hospital-general-dr-enrique-cabrera/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	},
	{
		id: 'ile-hospital-materno-infantil-cuautepec',
		name: 'Hospital Materno Infantil Cuautepec',
		kind: 'ile-publica',
		address: 'Av. Emiliano Zapata núm. 17, Col. Cuautepec Barrio Bajo, C.P. 07210, Gustavo A. Madero',
		borough: 'Gustavo A. Madero',
		location: { latitude: 19.5397608, longitude: -99.1408013 },
		hours:
			'Lunes a viernes, de 7:00 a 14:00 horas. La página de la fuente trae el aviso «Fuera de servicio en el mes de junio de 2024»; confirmar que el servicio esté activo',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Llegar a las 7:00 horas',
			'Acudir en ayunas',
			'El servicio se brinda en el área de Urgencias'
		],
		services: MEDICATED_AND_SURGICAL,
		phone: '55 5306 2190',
		sourceName: SOURCE_NAME,
		sourceUrl: 'http://ile.salud.cdmx.gob.mx/hospital-materno-infantil-cuautepec/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	},
	{
		id: 'ile-hospital-materno-infantil-cedillo',
		name: 'Hospital Materno Infantil Dr. Nicolás M. Cedillo',
		kind: 'ile-publica',
		address:
			'Gustavo J. s/n esq. Víctor Hernández Covarrubias, Col. Unidad Francisco Villa, C.P. 02400, Azcapotzalco',
		borough: 'Azcapotzalco',
		location: { latitude: 19.4979706, longitude: -99.2033303 },
		hours: 'Lunes a viernes, de 7:00 a 15:00 horas',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Llegar a las 7:00 horas, en ayunas, al área de Archivo',
			'Llevar una botella de agua natural',
			'El servicio se brinda en Consulta Externa'
		],
		services: MEDICATED_AND_SURGICAL,
		phone: '55 5394 0565',
		sourceName: SOURCE_NAME,
		sourceUrl: 'http://ile.salud.cdmx.gob.mx/hospital-materno-infantil-dr-nicolas-m-cedillo/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	},
	{
		id: 'ile-hospital-materno-infantil-inguaran',
		name: 'Hospital Materno Infantil Inguarán',
		kind: 'ile-publica',
		address: 'Calle Estaño núm. 307, Col. Felipe Ángeles, C.P. 15310, Venustiano Carranza',
		borough: 'Venustiano Carranza',
		location: { latitude: 19.4520667, longitude: -99.1130365 },
		hours: 'Lunes a viernes, de 7:00 a 14:00 horas',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Llegar a las 7:00 horas',
			'Acudir en ayunas',
			'Ir al Módulo de Atención Ciudadana y al archivo clínico de Consulta Externa',
			'Llevar una botella de agua natural y la primera orina de la mañana en un frasco estéril (de farmacia)'
		],
		services: MEDICATED_AND_SURGICAL,
		phone: '55 5795 6764',
		sourceName: SOURCE_NAME,
		sourceUrl: 'http://ile.salud.cdmx.gob.mx/hospital-materno-infantil-inguaran/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	},
	{
		id: 'ile-hospital-materno-infantil-tlahuac',
		name: 'Hospital Materno Infantil Tláhuac',
		kind: 'ile-publica',
		address: 'Av. Tláhuac-Chalco núm. 231, Col. La Habana, C.P. 13050, Tláhuac',
		borough: 'Tláhuac',
		location: { latitude: 19.264999, longitude: -98.9980609 },
		hours: 'Lunes a viernes, de 7:00 a 15:00 horas',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Llegar a las 7:00 horas al Archivo Clínico de Consulta Externa, frente a la entrada principal',
			'Acudir con una persona adulta como acompañante y sin niñas ni niños',
			'Acudir en ayunas (8 horas), porque se hacen estudios de laboratorio como glucosa'
		],
		services: MEDICATED_AND_SURGICAL,
		phone: '55 5842 3601',
		sourceName: SOURCE_NAME,
		sourceUrl: 'http://ile.salud.cdmx.gob.mx/hospital-materno-infantil-tlahuac/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	},
	{
		id: 'ile-hospital-materno-pediatrico-xochimilco',
		name: 'Hospital Materno Pediátrico Xochimilco',
		kind: 'ile-publica',
		address: 'Calz. Nativitas y 16 de Septiembre s/n, Barrio Xaltocan, C.P. 16090, Xochimilco',
		borough: 'Xochimilco',
		location: { latitude: 19.2525055, longitude: -99.1010498 },
		hours:
			'Lunes a viernes, de 7:00 a 14:00 horas. La fuente indica: FUERA DE SERVICIO hasta nuevo aviso',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Ir al área de Enfermería de Consulta Externa, consultorio 12'
		],
		services: MEDICATED_AND_SURGICAL,
		phone: '55 5666 0555',
		sourceName: SOURCE_NAME,
		sourceUrl: 'http://ile.salud.cdmx.gob.mx/hospital-materno-pediatrico-xochimilco/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	},
	{
		id: 'ile-hospital-general-ticoman',
		name: 'Hospital General de Ticomán',
		kind: 'ile-publica',
		address:
			'Plan de San Luis s/n entre Miguel Bernard y Bandera, Col. Ticomán, C.P. 07330, Gustavo A. Madero',
		borough: 'Gustavo A. Madero',
		location: { latitude: 19.5145772, longitude: -99.1380497 },
		hours: 'Lunes a viernes, de 6:30 a 14:00 horas',
		requirements: [
			...GENERAL_REQUIREMENTS,
			'Llegar a las 6:00 horas',
			'Ir al Módulo de Atención Ciudadana, frente a la entrada principal del hospital'
		],
		services: MEDICATED_AND_SURGICAL,
		phone: '55 5038 1700 ext. 7175',
		sourceName: SOURCE_NAME,
		sourceUrl: 'http://ile.salud.cdmx.gob.mx/hospital-general-ticoman/',
		verifiedAt: null,
		verificationStatus: 'por-verificar'
	}
];
