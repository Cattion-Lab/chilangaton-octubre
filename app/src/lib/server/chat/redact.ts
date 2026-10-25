const EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
const CURP = /\b[A-Z]{4}\d{6}[HMX][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d\b/gi;
const PHONE = /(?<![\w])\+?\d(?:[\s().-]{0,2}\d){7,}(?![\w])/g;
const NAME =
	/\b([Mm]e llamo|[Mm]i nombre(?: completo)? es|[Ss]oy)\s+[A-ZÁÉÍÓÚÑ][\p{L}'’-]*(?:\s+(?:(?:de|del|la|las|los|y)\s+){0,2}[A-ZÁÉÍÓÚÑ][\p{L}'’-]*){0,4}/gu;

export function redactPersonalData(text: string): string {
	return text
		.replace(EMAIL, '[correo omitido]')
		.replace(CURP, '[CURP omitida]')
		.replace(PHONE, '[teléfono omitido]')
		.replace(NAME, '$1 [nombre omitido]');
}
