<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_GOOGLE_MAP_ID, PUBLIC_GOOGLE_MAPS_KEY } from '$app/env/public';
	import { loadMapLibraries, type MapLibraries } from '#lib/maps/loader.ts';
	import { decodePolyline } from '#lib/maps/polyline.ts';
	import {
		reportedPresence,
		ROTATING_SITES_NOTE,
		type ReportedZone
	} from '#lib/data/reported-presence.ts';
	import { CDMX_BOUNDS, type Clinic, type Station } from '#lib/types.ts';

	interface Props {
		clinics: Clinic[];
		station: Station | null;
		selectedClinicId: string | null;
		polyline: string | null;
		lineColor: string;
		onselect: (clinicId: string) => void;
	}

	let { clinics, station, selectedClinicId, polyline, lineColor, onselect }: Props = $props();

	const CITY_CENTER = { lat: 19.4326, lng: -99.1332 };
	const CLINIC_COLOR = '#9d2449';
	const INK = '#3a1e12';
	const WHITE = '#fffaf6';
	const REVEAL_FALLBACK_MS = 4000;
	const TARGET_SIZE = 44;
	const ZONE_FILL = '#3b3b3b';
	const ZONE_INK = '#26211e';
	const ZONE_ICON_LIFT = 12;
	const ZONE_RADIUS_M = 150;
	const FREQUENT_RADIUS_M = 250;

	let container: HTMLDivElement;
	let libs: MapLibraries | undefined;
	let map: google.maps.Map | undefined;
	let clinicMarkers = new Map<string, google.maps.marker.AdvancedMarkerElement>();
	let stationMarker: google.maps.marker.AdvancedMarkerElement | undefined;
	let routeCasing: google.maps.Polyline | undefined;
	let routeLine: google.maps.Polyline | undefined;
	let zoneShapes: { circle: google.maps.Circle; marker: google.maps.marker.AdvancedMarkerElement }[] = [];
	let zoneInfo: google.maps.InfoWindow | undefined;

	let status = $state<'loading' | 'ready' | 'error'>('loading');
	let shown = $state(false);

	function guard(run: () => void): void {
		try {
			run();
		} catch {
			status = 'error';
			shown = true;
		}
	}

	function buildTarget(dot: HTMLElement): HTMLElement {
		const target = document.createElement('div');
		target.style.cssText = `width:${TARGET_SIZE}px;height:${TARGET_SIZE}px;display:grid;place-items:center;transform:translateY(50%);`;
		target.append(dot);
		return target;
	}

	function buildClinicDot(selected: boolean): HTMLElement {
		const size = selected ? 26 : 18;
		const dot = document.createElement('div');
		dot.style.cssText = `width:${size}px;height:${size}px;box-sizing:border-box;border-radius:50%;background:${CLINIC_COLOR};border:3px solid ${WHITE};`;
		return buildTarget(dot);
	}

	function buildStationDot(): HTMLElement {
		const dot = document.createElement('div');
		dot.style.cssText = `width:22px;height:22px;box-sizing:border-box;border-radius:50%;background:${WHITE};border:3px solid ${INK};`;
		return buildTarget(dot);
	}

	function buildZoneIcon(zone: ReportedZone): HTMLElement {
		const size = zone.frequent ? 40 : 30;
		const box = document.createElement('div');
		box.style.cssText = `width:${Math.max(TARGET_SIZE, size + 8)}px;height:${size + ZONE_ICON_LIFT}px;display:flex;justify-content:center;align-items:flex-start;`;
		box.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5 29.5 27.5H2.5Z" fill="${ZONE_INK}" stroke="${WHITE}" stroke-width="2.5" stroke-linejoin="round"/><path d="M16 11v8" stroke="${WHITE}" stroke-width="3" stroke-linecap="round"/><circle cx="16" cy="23.2" r="1.7" fill="${WHITE}"/></svg>`;
		return box;
	}

	function buildZoneInfo(zone: ReportedZone): HTMLElement {
		const box = document.createElement('div');
		box.style.cssText = 'max-width:240px;font:15px/1.4 Rubik,system-ui,sans-serif;color:#3a1e12;';
		if (zone.frequent) {
			const lead = document.createElement('strong');
			lead.style.display = 'block';
			lead.textContent = 'Punto frecuente de vigilias';
			box.append(lead);
		}
		const text = document.createElement('span');
		text.textContent = `${zone.label} · ${zone.source}, ${zone.reportedOn}`;
		box.append(text);
		return box;
	}

	function openZone(zone: ReportedZone): void {
		if (!libs || !map) return;
		zoneInfo ??= new libs.maps.InfoWindow();
		zoneInfo.setContent(buildZoneInfo(zone));
		zoneInfo.setPosition({ lat: zone.location.latitude, lng: zone.location.longitude });
		zoneInfo.open({ map });
	}

	onMount(() => {
		let cancelled = false;
		const fallback = setTimeout(() => {
			shown = true;
		}, REVEAL_FALLBACK_MS);

		loadMapLibraries(PUBLIC_GOOGLE_MAPS_KEY)
			.then((loaded) => {
				if (cancelled) return;
				libs = loaded;
				map = new loaded.maps.Map(container, {
					center: CITY_CENTER,
					zoom: 11,
					minZoom: 10,
					mapId: PUBLIC_GOOGLE_MAP_ID,
					restriction: { latLngBounds: { ...CDMX_BOUNDS }, strictBounds: true },
					mapTypeControl: false,
					streetViewControl: false,
					fullscreenControl: true,
					clickableIcons: false,
					gestureHandling: 'cooperative'
				});
				const reveal = map.addListener('tilesloaded', () => {
					shown = true;
					reveal.remove();
				});
				status = 'ready';
			})
			.catch(() => {
				if (!cancelled) {
					status = 'error';
					shown = true;
				}
			});

		return () => {
			cancelled = true;
			clearTimeout(fallback);
			for (const marker of clinicMarkers.values()) marker.map = null;
			clinicMarkers.clear();
			if (stationMarker) stationMarker.map = null;
			routeCasing?.setMap(null);
			routeLine?.setMap(null);
			map = undefined;
		};
	});

	$effect(() => {
		if (status !== 'ready' || !libs || !map) return;
		guard(syncClinics);
	});

	function syncClinics(): void {
		if (!libs || !map) return;
		const currentMap = map;
		const activeIds = new Set(clinics.map((clinic) => clinic.id));

		for (const [id, marker] of clinicMarkers) {
			if (!activeIds.has(id)) {
				marker.map = null;
				clinicMarkers.delete(id);
			}
		}

		for (const clinic of clinics) {
			const selected = clinic.id === selectedClinicId;
			let marker = clinicMarkers.get(clinic.id);
			if (!marker) {
				marker = new libs.marker.AdvancedMarkerElement({
					map: currentMap,
					position: { lat: clinic.location.latitude, lng: clinic.location.longitude },
					title: clinic.name,
					gmpClickable: true
				});
				marker.addEventListener('gmp-click', () => onselect(clinic.id));
				clinicMarkers.set(clinic.id, marker);
			}
			marker.content = buildClinicDot(selected);
			marker.zIndex = selected ? 10 : 1;
		}
	}

	$effect(() => {
		if (status !== 'ready' || !libs || !map) return;
		guard(syncZones);
	});

	function syncZones(): void {
		if (!libs || !map || zoneShapes.length > 0) return;
		const currentMap = map;
		for (const zone of reportedPresence) {
			const center = { lat: zone.location.latitude, lng: zone.location.longitude };
			const circle = new libs.maps.Circle({
				map: currentMap,
				center,
				radius: zone.frequent ? FREQUENT_RADIUS_M : ZONE_RADIUS_M,
				fillColor: ZONE_FILL,
				fillOpacity: 0.3,
				strokeColor: ZONE_INK,
				strokeOpacity: 0.9,
				strokeWeight: 2,
				clickable: true,
				zIndex: 0
			});
			circle.addListener('click', () => openZone(zone));
			const marker = new libs.marker.AdvancedMarkerElement({
				map: currentMap,
				position: center,
				title: `${zone.label} · ${zone.source}, ${zone.reportedOn}`,
				content: buildZoneIcon(zone),
				gmpClickable: true,
				zIndex: 0
			});
			marker.addEventListener('gmp-click', () => openZone(zone));
			zoneShapes.push({ circle, marker });
		}
	}

	$effect(() => {
		if (status !== 'ready' || !libs || !map) return;
		guard(syncStation);
	});

	function syncStation(): void {
		if (!libs || !map) return;
		if (!station) {
			if (stationMarker) {
				stationMarker.map = null;
				stationMarker = undefined;
			}
			return;
		}
		const position = { lat: station.location.latitude, lng: station.location.longitude };
		if (!stationMarker) {
			stationMarker = new libs.marker.AdvancedMarkerElement({
				map,
				position,
				title: `Estación ${station.name}`,
				content: buildStationDot(),
				zIndex: 5
			});
		} else {
			stationMarker.position = position;
			stationMarker.title = `Estación ${station.name}`;
			stationMarker.map = map;
		}
	}

	$effect(() => {
		if (status !== 'ready' || !libs || !map) return;
		guard(syncRoute);
	});

	function syncRoute(): void {
		if (!libs || !map) return;
		const currentMap = map;
		routeCasing?.setMap(null);
		routeLine?.setMap(null);
		routeCasing = undefined;
		routeLine = undefined;

		const bounds = new libs.core.LatLngBounds();
		let hasBounds = false;

		if (polyline) {
			const path = decodePolyline(polyline);
			if (path.length > 1) {
				routeCasing = new libs.maps.Polyline({
					map: currentMap,
					path,
					strokeColor: WHITE,
					strokeOpacity: 0.9,
					strokeWeight: 9,
					zIndex: 1
				});
				routeLine = new libs.maps.Polyline({
					map: currentMap,
					path,
					strokeColor: lineColor,
					strokeOpacity: 1,
					strokeWeight: 5,
					zIndex: 2
				});
				for (const point of path) bounds.extend(point);
				hasBounds = true;
			}
		}

		if (!hasBounds && station && selectedClinicId) {
			const clinic = clinics.find((item) => item.id === selectedClinicId);
			if (clinic) {
				bounds.extend({ lat: station.location.latitude, lng: station.location.longitude });
				bounds.extend({ lat: clinic.location.latitude, lng: clinic.location.longitude });
				hasBounds = true;
			}
		} else if (!hasBounds && selectedClinicId) {
			const clinic = clinics.find((item) => item.id === selectedClinicId);
			if (clinic) {
				currentMap.panTo({ lat: clinic.location.latitude, lng: clinic.location.longitude });
			}
		}

		if (hasBounds) currentMap.fitBounds(bounds, 48);
	}
</script>

<div class="map-frame">
	<div
		class="map-canvas"
		class:shown={shown && status !== 'error'}
		bind:this={container}
		role="region"
		aria-label="Mapa de la Ciudad de México con las clínicas y orientación"
	></div>
	{#if status !== 'error'}
		<div class="legend" class:shown={shown}>
			<p class="legend-key">
				<span class="swatch" aria-hidden="true"></span>Zona con presencia antiaborto reportada
			</p>
			<p class="legend-note">{ROTATING_SITES_NOTE}</p>
		</div>
	{/if}
	{#if status === 'loading'}
		<p class="map-status" role="status">Cargando el mapa…</p>
	{:else if status === 'error'}
		<p class="map-status map-status-error" role="alert">
			No pudimos cargar el mapa. La lista de lugares y el cálculo de trayectos siguen funcionando.
		</p>
	{/if}
</div>

<style>
	.map-frame {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: var(--map);
	}

	.map-canvas {
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 200ms ease-out;
	}

	.map-canvas.shown {
		opacity: 1;
	}

	.legend {
		position: absolute;
		top: 8px;
		left: 8px;
		display: grid;
		gap: 4px;
		max-width: min(300px, calc(100% - 72px));
		padding: 8px 10px;
		border: 1px solid var(--rule);
		border-radius: var(--radius-sm);
		background: var(--white);
		font-size: 13px;
		line-height: 1.35;
		opacity: 0;
		transition: opacity 200ms ease-out;
	}

	.legend.shown {
		opacity: 1;
	}

	.legend p {
		margin: 0;
	}

	.legend-key {
		display: flex;
		gap: 8px;
		align-items: flex-start;
		font-weight: 500;
	}

	.legend-note {
		color: var(--ink-soft);
	}

	.swatch {
		flex: none;
		width: 14px;
		height: 14px;
		margin-top: 2px;
		box-sizing: border-box;
		border: 2px solid #26211e;
		border-radius: 50%;
		background: rgb(59 59 59 / 0.3);
	}

	@media (prefers-reduced-motion: reduce) {
		.legend {
			transition: none;
		}
	}

	.map-status {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		margin: 0;
		padding: 24px;
		text-align: center;
		color: var(--ink-soft);
		pointer-events: none;
		animation: status-in 200ms ease-out 400ms both;
	}

	.map-status-error {
		pointer-events: auto;
		background: var(--map);
		color: var(--ink);
		animation: none;
	}

	@keyframes status-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
