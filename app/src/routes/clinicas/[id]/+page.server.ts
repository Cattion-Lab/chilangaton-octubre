import { error } from '@sveltejs/kit';
import { clinics } from '#lib/data/clinics.ts';
import { stations } from '#lib/data/stations.ts';
import { KIND_LABELS } from '#lib/components/clinic/labels.ts';
import { buildStationGroups } from './station-groups.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params, url }) => {
	const index = clinics.findIndex((item) => item.id === params.id);
	if (index === -1) error(404, 'No encontramos esta ficha.');

	const clinic = clinics[index];
	const previous = clinics[(index - 1 + clinics.length) % clinics.length];
	const next = clinics[(index + 1) % clinics.length];
	const canonical = `${url.origin}/clinicas/${clinic.id}`;
	const description = `${KIND_LABELS[clinic.kind]} en ${clinic.borough}, Ciudad de México. Dirección, horario, requisitos y servicios con su fuente y la fecha de verificación.`;

	return {
		clinic,
		previous: { id: previous.id, name: previous.name },
		next: { id: next.id, name: next.name },
		canonical,
		description,
		stationGroups: buildStationGroups(),
		stations
	};
};
