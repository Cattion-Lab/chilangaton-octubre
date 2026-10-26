# RUTA LIBRE · Indicadores de accesibilidad y datos abiertos para el piloto

**Investigación de apoyo a la sección 9 («Indicadores territoriales») · Chilangatón 2026, equipo CATTION**
Fecha de elaboración: 25 de octubre de 2026 · Estado: borrador de trabajo, sin commit

**Leyenda de confianza:** 🟢 fuente primaria leída directamente · 🟡 fuente secundaria (prensa, agregadores, resúmenes de buscador con página leída) · 🔴 no verificado (solo fragmento de buscador, o sitio inaccesible).
En la lista final de fuentes, ✔ indica que el documento se descargó y leyó en esta sesión.

---

## 1. Resumen

1. **Metodología.** Hay un conjunto consolidado de medidas: tiempo puerta a puerta, tiempo a la oportunidad más cercana, oportunidades acumuladas bajo umbral de tiempo (Hansen 1959, vía BID), isócronas, costo como % del ingreso y 2SFCA (oferta/demanda). Para un piloto de pocas semanas con pocos servicios ILE, lo apropiado es **tiempo mínimo + oportunidades acumuladas con umbrales (30/45/60/90 min) calculados desde puntos de origen definidos**, no un 2SFCA (que requiere capacidad de cada servicio y población por zona). 🟢 (BID, Banco Mundial, WRI) / 🟡 (2SFCA)
2. **Herramientas abiertas.** `r5r` (MIT, v2.4.0, CRAN 2026-05-20) calcula matrices de tiempo y costo, itinerarios detallados, accesibilidad e isócronas con GTFS + OSM, y corre en local, lo cual importa para la privacidad. OpenTripPlanner (LGPL-3) y Valhalla (MIT) son alternativas; el soporte de tránsito de Valhalla es incierto. 🟢
3. **Hallazgo crítico sobre datos.** Existe un GTFS estático oficial de SEMOVI-CDMX (Mobility Database: 301 rutas, 9 agencias, incluye Cablebús, Metrobús, corredores concesionados y Ferrocarriles Suburbanos; última descarga registrada 9-mar-2026, con 3 errores y 9 advertencias de validación). 🟡 **No encontré GTFS publicado para Mexibús, Mexicable ni para el transporte concesionado del Estado de México en la ZMVM.** El único GTFS estatal localizado cubre Toluca y Jilotepec. 🟢/🟡 Un trabajo de WRI México (2021) ya tuvo que excluir microbuses y combis por la misma razón. 🟢 Esto limita la validez del piloto para orígenes en municipios conurbados.
4. **Encuesta Origen-Destino.** La EOD 2017 de INEGI es la más reciente que encontré; no hay evidencia de una posterior. 🟡 WRI México publicó una **base reprocesada** (nuevos factores de expansión, distancia y costo de viaje) con licencia Creative Commons (variante no especificada en la página). 🟢
5. **Limitación de acceso.** Los sitios oficiales del Gobierno de la CDMX (datos.cdmx.gob.mx, metro, metrobús, cablebús, semovi, sieg, salud.cdmx) **rechazaron la conexión** (connection reset) desde este entorno. Las tarifas y horarios provienen de prensa; no se pudieron descargar ni inspeccionar los GTFS. Todo valor oficial debe reverificarse antes de usarse.
6. **Viabilidad.** De los 7 indicadores de evaluación del piloto, 5 son plenamente factibles en 4-6 semanas (fuente/fecha, orígenes y alternativas, disponibilidad de estimaciones, privacidad, recomendaciones sustentadas); 2 son factibles con alcance reducido (incompatibilidad de horarios, y comprensión con escenarios ficticios con muestra pequeña). Ver sección 5.
7. **Sobre «seguro».** Es un término técnicamente cargado (OMS: «aborto seguro»), ambiguo (seguridad clínica, jurídica, personal, del trayecto) y, aplicado a territorios, produce etiquetado y riesgo de daño. Recomiendo no usarlo como categoría de territorio y medir condiciones observables con umbrales y distribuciones. Ver sección 6.1.

---

## 2. Metodologías para medir accesibilidad a servicios de salud en transporte público

### 2.1 Marco conceptual

- **Acceso como ajuste entre persona y sistema (Penchansky y Thomas, 1981):** disponibilidad, accesibilidad (ubicación, tiempo, costo de traslado), acomodación (horarios, citas), asequibilidad y aceptabilidad. El piloto de Ruta Libre cubre sobre todo *accesibilidad*, *acomodación* (horarios) y *asequibilidad* (costo); *aceptabilidad* queda fuera de lo medible con GTFS. 🟡 (resumen de buscador; no se leyó el artículo original)
- **Accesibilidad como potencial de interacción (BID, Nota técnica IDB-TN-1562, 2018):** la accesibilidad es la capacidad de alcanzar oportunidades mediante la oferta de transporte; destaca que permite poner la equidad en primer plano. Clasifica las medidas en (a) basadas en infraestructura, (b) basadas en costo de viaje, (c) basadas en actividades (contorno / gravitacionales / oportunidades acumuladas), (d) basadas en utilidad y (e) espacio-temporales. 🟢
- **Tres formas de indicador agregado (BID):** (1) oportunidades acumuladas bajo umbral de tiempo; (2) capacidad de alcanzar al menos una oportunidad en un umbral (indicador dicotómico de suficiencia, «accesibilidad básica»); (3) tiempo a la oportunidad más cercana. El BID señala que el segundo y el tercero sirven para describir a quienes están en los estratos más bajos de accesibilidad. 🟢

### 2.2 Medidas y cuándo usarlas

| Medida | Fórmula / idea | Datos que exige | Ventaja | Limitación | Uso en el piloto | Confianza |
|---|---|---|---|---|---|---|
| **Tiempo de viaje puerta a puerta** | Caminata de acceso + espera + tiempo en vehículo + transbordos + caminata de egreso, para una hora de salida | GTFS, red peatonal (OSM), origen y destino | Intuitivo; es lo que vive la persona | Depende de hora/día de salida y de la fidelidad del GTFS (horario programado, no real) | **Núcleo del piloto** | 🟢 (BID, r5r) |
| **Tiempo a la oportunidad más cercana** | `OC_i = min_j t_ij` (BID, ec. 2) | Igual + ubicación de servicios | Directo; robusto con pocos servicios | Ignora que el servicio más cercano puede no ser el adecuado (horario, requisitos) | **Núcleo** (hay pocos servicios ILE) | 🟢 |
| **Oportunidades acumuladas (Hansen/contorno)** | `A_i = Σ_j O_j · f(t_ij)`; con `f` dicotómica: `f=1` si `t_ij ≤ τ` (BID, ec. 3 y Fig. 2) | Igual + peso `O_j` (p. ej., 1 por servicio) | Fácil de comunicar; compara territorios | Elección arbitraria de τ; con ~decenas de servicios, `A_i` toma pocos valores | **Complementario**; reportar para varios τ | 🟢 |
| **Isócronas** | Polígonos alcanzables en τ minutos | GTFS + OSM | Visual, útil en devolución comunitaria | Sensibles a hora de salida y a resolución; r5r recomienda no usarlas para contar oportunidades (usar `accessibility()`) | **Visual**, no para cálculo | 🟢 (r5r) / 🟢 (WRI-IDU las usa) |
| **Costo como % del ingreso** | `C_viaje(ida+vuelta)·n_visitas / ingreso del periodo` | Reglas tarifarias, ingreso (ENIGH por decil o salario mínimo como referencia) | Mide asequibilidad (BID: medir solo gasto puede subestimar, pues personas pobres evitan viajes caros) | No hay umbral mexicano oficial; el 10 % del ingreso es referencia de España | **Escenarios** de ingreso, no personas reales | 🟡 |
| **2SFCA** | Paso 1: `R_j = S_j / Σ_k P_k·[d_kj ≤ d0]`; paso 2: `A_i = Σ_j R_j·[d_ij ≤ d0]` | Capacidad `S_j` (camas, consultorios, procedimientos) y población `P_k` por zona | Combina oferta, demanda y distancia | Requiere capacidad y demanda potencial, que no son públicas ni confiables para ILE; casi todos los estudios asumen auto (Langford, Higgs y Fry 2015 proponen una variante multimodal) | **Fuera del piloto**; extensión futura | 🟡 |
| **Medidas espacio-temporales / individuales** | Itinerarios y horarios de cada persona | Encuestas de actividad individuales | Captan restricciones reales | BID: exigen datos individuales, resultados solo representativos del grupo encuestado, y mayor costo | **No usar** (riesgo de privacidad) | 🟢 |

### 2.3 Buenas prácticas que afectan el diseño

1. **Hora de salida y ventana de tiempo.** `r5r` calcula tiempos de tránsito para una hora de salida y una ventana (`departure_datetime`, `time_window`, percentiles). Estudios que solo usan un instante o la hora pico ignoran la variación del horario. Reportar mediana y percentil 85 sobre una ventana, y por tipo de día. 🟢 (r5r) / 🟡 (literatura)
2. **GTFS programado ≠ servicio real.** Braga, Loureiro y Pereira (2023) encontraron en Fortaleza que el GTFS programado subestima la accesibilidad 1.5 % en promedio, pero en algunas zonas el error supera 40 %. Es un caso de otra ciudad; sirve como advertencia, no como cifra para CDMX. 🟡
3. **Unidad espacial (MAUP).** El nivel de agregación puede cambiar los resultados de análisis de equidad en tránsito (Javanmard et al. 2023, sobre confiabilidad del transporte). Usar puntos de origen explícitos y reportar sensibilidad a la elección de orígenes. 🟡
4. **Umbrales de tiempo con base empírica local.** WRI México (IDU 2021) fijó 30 minutos para salud a partir de ENIGH 2018: tiempo promedio de traslado para atención médica 36 min; 42 min nacional y 31 min en localidades urbanas. No es un estándar normativo, y se refiere a atención médica en general, no a ILE. 🟢
5. **Precedente en la ZMVM con OTP.** WRI México calculó isócronas por manzana con OpenTripPlanner y un GTFS, **limitado a transporte masivo** (metro, BRT, trenes ligeros y suburbanos) por falta de información para un GTFS del transporte concesionado. 🟢
6. **Precedente con GTFS en salud.** El estudio del Banco Mundial sobre accesibilidad a servicios de salud y educación en ciudades africanas usa tiempo de viaje en transporte público al establecimiento más cercano, calculado con GTFS y horarios publicados, y compara además con la distribución de la pobreza. Es un modelo de presentación (tiempo al más cercano, % de población dentro de un umbral, y brechas por nivel de pobreza), aunque su contexto es otro. 🟢 (estructura y encabezados leídos; no leí todo el capítulo 6.4)
7. **Herramienta de ITDP México.** El Visualizador de Accesibilidad Urbana cubre 20 ciudades mexicanas con acceso a empleo, escuelas y salud según tiempo, costo y emisiones, con datos descargables por ciudad (según ITDP). 🟢 (blog leído) Su metodología detallada no se pudo consultar (sitio de la herramienta inaccesible), por lo que **no se debe citar como método**, solo como referente de visualización.

### 2.4 Herramientas abiertas

| Herramienta | Qué hace | Licencia | Notas para el piloto | Confianza |
|---|---|---|---|---|
| **r5r** (Ipea; R) | `travel_time_matrix()`, `expanded_travel_time_matrix()`, `detailed_itineraries()`, `accessibility()` (con funciones de decaimiento: escalón/oportunidades acumuladas, logística, exponencial, lineal), `isochrone()`; admite reglas de tarifas para costo monetario | MIT (CRAN: v2.4.0, publicada 2026-05-20; depende de R5 v7.1; requiere Java JDK ≥ 21) | **Recomendada.** Corre localmente (no envía orígenes a terceros), reproducible, entrada GTFS + OSM | 🟢 |
| **R5 / Conveyal** | Motor Java detrás de r5r | MIT (2020-2025, Conveyal LLC) | Alternativa vía Conveyal Analysis (servicio) | 🟢 |
| **OpenTripPlanner 2** | Planificador multimodal con GTFS + OSM, API GraphQL | LGPL v3 | Útil si se quiere un demostrador de itinerarios; precedente de WRI en la ZMVM. La API de isócronas no se confirmó | 🟢 (licencia y README) |
| **Valhalla** | Enrutamiento, matrices, isócronas con OSM | MIT | Su README anuncia rutas multimodales con transporte público, pero reportes de 2022 indican que el soporte de tránsito tuvo problemas; no confirmé que funcione hoy. No usar como motor principal sin prueba | 🟢 (licencia) / 🟡 (tránsito) |
| **gtfstools / validador de MobilityData** | Inspección y validación de GTFS | n/v | Validar el feed antes de calcular | 🔴 (no leí su documentación) |
| **OpenStreetMap** | Red peatonal y vial | ODbL (a citar: © colaboradores de OpenStreetMap) | Descargar extracto de la ZMVM (p. ej., Geofabrik) | 🟡 (página de copyright leída; el extracto no se descargó) |

---

## 3. Inventario de datos abiertos para CDMX y zona metropolitana

**Aviso:** no pude acceder a datos.cdmx.gob.mx ni a los sitios operativos (connection reset). Las licencias y fechas proceden de agregadores (Mobility Database, Banco Mundial) y deben reverificarse en el portal. Las licencias de datasets del portal CDMX varían por conjunto; una fuente de 2021 indica que la mayoría usaba CC-BY (🔴, no se pudo abrir el documento).

### 3.1 GTFS y datos de red

| Dato | Cobertura | URL | Licencia | Última actualización | Notas | Confianza |
|---|---|---|---|---|---|---|
| **GTFS estático SEMOVI CDMX** (Mobility Database `mdb-1830`) | 9 agencias, 301 rutas: Cablebús, Corredores Concesionados, Ferrocarriles Suburbanos, Metrobús «y más»; tipos de ruta: tranvía/tren ligero, metro, tren, autobús, teleférico, trolebús. El registro de metadatos CentroGeo (vía buscador) lista Metro, Metrobús, Trolebús (STE), RTP, Tren Ligero, Suburbano, Cablebús y corredores | Productor: `https://datos.cdmx.gob.mx/dataset/75538d96-3ade-4bc5-ae7d-d85595e4522d/resource/32ed1b6b-41cd-49b3-b7f0-b57acb0eb819/download/gtfs-2.zip`; ficha de licencia: `https://datos.cdmx.gob.mx/dataset/gtfs`; agregador: `https://mobilitydatabase.org/feeds/gtfs/mdb-1830` | **Sin verificar**: el agregador solo remite a la ficha del portal | Descarga más reciente registrada por el agregador: **9-mar-2026** (2.29 MB zip; 3 errores, 9 advertencias). Versión previa (dic-2024): rango de servicio 1-dic-2024 a 1-ene-2026. Rango de servicio del feed de 2026: no se mostró | Incluye formas (shapes), colores y accesibilidad de paradas. **No pude descargar el zip.** Falta confirmar qué agencias lo componen (la lista visible se corta en 4 de 9), si trae `fare_attributes`, `frequencies` o `stop_times` completos, y si el calendario cubre la fecha del piloto | 🟡 |
| **GTFS CDMX en Transitland / Banco Mundial** | CDMX | `https://datacatalog.worldbank.org/search/dataset/0038247/mexico-city-mexico-general-transit-feed-specification-gtfs` | **CC BY 4.0** | Archivo del 12-jun-2020; metadatos al 19-ene-2023 | **Obsoleto**; solo referencia histórica | 🟢 |
| **Metro / Metrobús / STE / RTP** como GTFS separados | — | — | — | — | No localicé feeds independientes; parecen estar dentro del feed de SEMOVI. Verificar en el zip | 🔴 |
| **Mexibús y Mexicable (Edomex)** | ZMVM norte/oriente | — | — | — | **No encontré GTFS.** Citymapper (2013-2015) usaba datos hechos con usuarios para Mexibús. El único GTFS estatal localizado cubre Toluca (622 rutas) y Jilotepec (65 rutas) (SEMOV con iniciativa MapaData, 2025-2026); no cubre la ZMVM | 🟡 |
| **Tren Suburbano** | Buenavista-Cuautitlán (y ramal AIFA) | Dentro del feed de SEMOVI (agencia «Ferrocarriles Suburbanos») | ver arriba | ver arriba | Ramal AIFA: tarifa distinta; no incluir sin verificar | 🟡 |
| **Concesionado: microbús, combi** | Mayor parte de viajes en la ZMVM | — | — | — | El feed de SEMOVI incluye «Corredores Concesionados», **no** las rutas de microbús y combi no corredorizadas. WRI-IDU 2021 las excluyó por falta de información. Fuentes colaborativas (Mapatón) no verificadas | 🟡 / 🔴 |
| **Red peatonal y vial** | ZMVM | `https://www.openstreetmap.org/copyright` | ODbL | continua | Calidad desigual en periferia: verificar aceras y cruces en la zona de pruebas | 🟡 |
| **Directorio de unidades ILE** | CDMX | `https://ile.salud.cdmx.gob.mx/directorio-clinicas-interrupcion-legal-del-embarazo` | n/v | n/v | Al intentar abrir la URL devolvió un error de configuración de WordPress/PHP (ver nota); los PDF de salud.cdmx rechazaron la conexión. Por un buscador: ~14-15 unidades (7 centros de salud y 7 hospitales), horarios sin actualizar. **No hay dataset abierto confirmado**; el inventario deberá construirse de forma manual, con fuente y fecha | 🔴 |

*Nota sobre el directorio ILE:* el cambio de administración de los servicios de salud (IMSS-Bienestar desde julio de 2024, según otro documento del repositorio) obliga a verificar qué fuente es vigente para el directorio.

### 3.2 Tarifas (lo vigente hasta donde pude leer)

Todas las tarifas provienen de prensa, no de la autoridad. Fecha de la nota entre paréntesis.

| Sistema | Tarifa por viaje | Fuente leída | Confianza |
|---|---|---|---|
| Metro | **$5**, transbordos sin costo adicional entre líneas; el costo real es ~$13 (subsidio) | TV Azteca (1-jun-2026); ADN40 (confirmación de la jefa de Gobierno para 2026) | 🟡 |
| Metrobús | **$6** (general); Línea 4 con origen/destino Aeropuerto: **$30** | TV Azteca (1-jun-2026); UnoTV | 🟡 |
| Cablebús | **$7** | TV Azteca (1-jun-2026) | 🟡 |
| Tren Ligero | **$3** | TV Azteca; UnoTV | 🟡 |
| Trolebús (STE) | Líneas 1-9: **$4**; Trolebús Elevado y líneas 12 y 13: **$7**; Nochebús: **$7**; Línea 11: **$13** | TV Azteca (1-jun-2026) | 🟡 |
| RTP | Ordinario **$2**; Exprés **$4**; Ecobús **$5**; Nochebús **$7** | TV Azteca; UnoTV | 🟡 |
| Microbús/vagoneta (CDMX) | **$7.50** primeros 5 km; $8 de 5 a 12 km; $9 en rutas más largas | TV Azteca (1-jun-2026) | 🟡 |
| Corredores concesionados | **$8.50** tramo corto; **$9.50** si pasa de 5 km | TV Azteca (1-jun-2026) | 🟡 |
| Tren Suburbano | Viaje corto (0-12.89 km): **$11.50**; largo (12.9-25.6 km): **$26.50**, vigentes desde el **5-abr-2026** (publicados en el DOF, según prensa); tarjeta de acceso **$18** | Chilango (6-abr-2026); ADN40 (oct-2026) | 🟡 |
| Mexibús (Edomex) | **$10** (líneas 1, 1A, 2, 2A, 3, 3A y 4); corredor Chimalhuacán-Chicoloapan **$9**; estudiantes $7; Mujeres con Bienestar $9.50; tarjeta Movimex $15 | Chilango (16-oct-2025) | 🟡 (nota de 2025; no confirmé cambio en 2026) |
| Mexicable (Edomex) | **$10** (líneas 1 y 2) | Resultados de buscador: Excélsior/ADN40 (oct-2025) | 🔴 |
| Transporte concesionado Edomex | Tarifa mínima de $12 a $14 (oct-2025) | Chilango; UnoTV | 🟡 |

**Para el modelo de costo:** el Metro permite transbordo gratuito, pero cada medio tiene su propia tarifa y no hay integración tarifaria completa entre sistemas (la «Tarjeta de Movilidad Integrada» sirve como pago, sin garantía de tarifa integrada). Codificar las reglas por etapa y por zona, con una columna «fecha de la fuente».

### 3.3 Horarios de operación

Los valores proceden de fragmentos de buscador de notas de prensa de 2021 a 2024 que **no abrí**. Tratarlos como pista, no como dato. 🔴

| Sistema | Lunes-viernes | Sábado | Domingo/festivo |
|---|---|---|---|
| Metro | 5:00-24:00 | 6:00-24:00 | 7:00-24:00 (último tren hasta ~0:30 según una fuente) |
| Metrobús | 4:30-24:00 | 4:30-24:00 | 5:00-24:00 |
| Cablebús | 5:00-23:00 | 6:00-23:00 | 7:00-23:00 |

**Alternativa de mejor calidad:** extraer el horario real desde `stop_times.txt`, `frequencies.txt` y `calendar*.txt` del GTFS (primer y último servicio por línea y tipo de día). Esto es lo que el piloto debería hacer; los horarios de prensa servirían solo para contrastar.

### 3.4 Encuesta Origen-Destino

| Dato | Detalle | URL | Licencia / términos | Fecha | Confianza |
|---|---|---|---|---|---|
| **EOD 2017 (INEGI)** — Encuesta Origen Destino en Hogares de la ZMVM | Diseño probabilístico, bietápico, estratificado y por conglomerados; 194 distritos; unidad de observación: viviendas y hogares; población objetivo: personas de 6 años y más. Levantamiento: 23-ene a 3-mar-2017 (según WRI). Más de 56 mil hogares y 200 mil personas (WRI). Incluye motivo del viaje, hora, origen-destino por distrito y modo | Catálogo: `https://www.inegi.org.mx/rnm/index.php/catalog/533` · Programa: `https://www.inegi.org.mx/programas/eod/2017/` | Uso libre con cita de fuente («Fuente: INEGI. Encuesta Origen Destino en Hogares de la ZMVM (EOD) 2017. Bases de datos»); licencia de usuario final; **prohibida la comercialización**; INEGI se reserva modificar las condiciones | Ficha creada y modificada el 22-nov-2022 | 🟢 |
| **¿Hay una EOD posterior?** | No encontré una EOD posterior de la ZMVM en el catálogo de INEGI ni en búsquedas; un estudio de 2024 aún usa la de 2017. Resultado negativo basado en búsqueda, no una afirmación oficial | — | — | — | 🟡 |
| **Base ajustada de WRI México** — «Base de datos ajustada de la EOD para la ZMVM, 2017» (Santana, Mendoza, Escalante y Hernández) | Nuevos factores de expansión para corregir subrepresentación (mujeres, periferia, menor escolaridad); variables nuevas de **distancia y costo del viaje**; categorización modal de viajes completos. Versión 1.0, sept-2023 | Documento: `https://doi.org/10.46830/wriwp.19.00078` (redirige a `https://es.wri.org/publicaciones/base-de-datos-ajustada-de-la-encuesta-origen-destino-para-la-zona-metropolitana-del-valle-de-mexico-2017`). CSV: `https://files.wri.org/es/eod_bd_reprocesadaWRI_4.1_Viajes_diaHabil.csv` y `https://files.wri.org/es/eod_bd_reprocesadaWRI_5_Transporte.csv` | «Creative Commons» (la página no indica la variante exacta; verificar antes de redistribuir) | Publicación del 10-oct-2023 | 🟢 (documento y enlaces); los CSV no se descargaron |
| **Limitaciones relevantes** | (i) El 29 % de los viajes en modos colectivos no tenía costo reportado y 10.1 % de los que sí lo tenían reportaba $5 o menos para viajes de casi dos horas (probables errores); (ii) la tarifa de 2017 fue asignada por modo y zona, no por tarifas 2026; (iii) el 10 % de la muestra no reportaba extremos completos del viaje; (iv) el ingreso no está disponible para el análisis; (v) el análisis es por distrito, no por AGEB | — | — | — | 🟢 |

**Uso en el piloto:** la EOD **no mide movilidad reproductiva ni a pacientes**; sirve para contexto (duración y costo típicos de viajes, distribución modal, diferencias por género) y para calibrar la plausibilidad de los tiempos calculados. No usar para estimar demanda ILE.

### 3.5 Otros datos para contexto (no verificados en esta sesión)

- Censo de Población y Vivienda 2020 (INEGI): población por AGEB/manzana para ponderar orígenes. 🔴
- ENIGH 2022 (INEGI): gasto en transporte e ingreso por decil, para el % del ingreso. Un artículo académico basado en ENIGH 2020 reporta 18.0 % (2018) y 15.2 % (2020) en «Transportes y comunicaciones» en CDMX (incluye vehículos y comunicaciones, no solo transporte público). 🟡
- CLUES (Secretaría de Salud) y DENUE (INEGI): ubicación de establecimientos de salud; WRI-IDU los usó (versión 2019). 🟢 para el uso por WRI / 🔴 para la disponibilidad actual.

---

## 4. Definiciones operativas de indicadores (sección 9)

**Convenciones.** `o` = punto de origen; `s` = servicio (unidad ILE); `h` = hora de salida; `d` = tipo de día (lunes-viernes, sábado, domingo). `t(o,s,h)` = tiempo puerta a puerta en minutos. Motor: `r5r` con GTFS + OSM, ejecutado localmente. Reportar siempre la **fecha del GTFS y de la tarifa** usada.

### 4.1 Indicadores territoriales (producto «Indicadores territoriales»)

| # | Indicador | Fórmula | Unidad | Fuente de datos | Limitaciones |
|---|---|---|---|---|---|
| T1 | **Duración puerta a puerta** | `T(o,s,d) = P50_h { t_acceso + t_espera + t_vehículo + t_transbordo + t_egreso }`, con salidas `h` cada 5-10 min en una ventana de 2 h por tipo de día; reportar también `P85` | minutos | GTFS SEMOVI, OSM, ubicación del servicio (manual verificada) | Horario programado, no real; no incluye microbús/combi ni Mexibús/Mexicable (sin GTFS); incertidumbre de espera y de caminata en periferia. Dato de r5r: se pueden fijar `max_walk_time` y `max_trip_duration` |
| T2 | **Costo monetario** | `C(o,s) = Σ_etapas tarifa(etapa, regla de transbordo)`; costo por ida y vuelta `C_rt = 2·C`. **Costo relativo:** `Cr = C_rt · n_viajes / Y_p`, con `Y_p` ingreso del periodo (escenarios: salario mínimo diario vigente y cada decil de ingreso de ENIGH) | pesos MXN; % del ingreso | Tarifas (sección 3.2), reglas de transbordo, ingreso de escenarios | No hay umbral oficial de asequibilidad en México; el 10 % es referencia externa (España). El número de visitas `n_viajes` depende del protocolo del servicio y debe sustentarse con fuente institucional (no asumirlo). No incluye costos ocultos: acompañante, pérdida de ingreso, cuidado de menores. Tarifas de microbús varían por distancia |
| T3 | **Transbordos** | `N_trans(o,s) = (n_abordajes − 1)` en el itinerario con menor tiempo; y `% itinerarios con ≥ 2 transbordos` entre las alternativas | conteo; % | `detailed_itineraries()` de r5r | Definición: un abordaje por vehículo/línea; contar el cambio entre sistemas como transbordo. Los tiempos de transbordo entre estaciones dependen de OSM |
| T4 | **Accesibilidad al servicio** | (a) **Tiempo al servicio más cercano:** `OC(o) = min_s T(o,s,d)`. (b) **Oportunidades acumuladas:** `A(o,τ) = Σ_s 1[T(o,s,d) ≤ τ]`, con τ ∈ {30, 45, 60, 90} min. (c) **Suficiencia:** `Suf(o,τ) = 1[A(o,τ) ≥ 1]` y `% de orígenes con Suf = 1` por zona. | minutos; número de servicios; % de orígenes | Resultado de T1, ubicación de servicios | Con ~14-15 servicios, `A` toma pocos valores y puede confundirse con la ubicación de los servicios. La elección de τ es arbitraria: mostrar la curva completa. Si se usan orígenes por zona, hay MAUP. No es una medida de población afectada, salvo que se pondere con Censo 2020 |
| T5 | **Compatibilidad de horarios (indicador territorial)** | Para cada servicio `s` con ventana de atención `[a_s, c_s]` en el día `d` y duración mínima de atención `m_s`: `Compat(o,s,d) = |{h ∈ H : llegada(h) ∈ [a_s, c_s − m_s] y existe regreso con salida ≥ llegada + m_s}| / |H|`, donde `H` son las horas de salida posibles. `Incompatible(o,s,d) = 1` si `Compat = 0` | proporción de salidas viables (0-1); binario | Horarios del servicio (fuente institucional con fecha) y GTFS (primer/último servicio, frecuencia) | Depende de que los horarios de atención estén publicados y sean fiables, y de definir `m_s` (tiempo mínimo de atención) con una fuente; no refleja citas ni filas. Se ignora el transporte nocturno no GTFS |

### 4.2 Indicadores de evaluación del piloto (lista en «Indicadores para evaluar el piloto»)

| # | Indicador | Fórmula | Unidad | Fuente de datos | Limitaciones |
|---|---|---|---|---|---|
| P1 | **% de servicios con fuente y fecha de verificación** | `P1 = N_ver / N_inv · 100`, con `N_ver` = servicios con ≥ 1 fuente primaria (URL o documento oficial) + fecha de consulta + archivo conservado (captura/PDF/hash), y fecha de consulta ≤ 30 días antes del cierre | % | Inventario institucional del propio equipo | Definir «verificado» a priori (nivel A: fuente primaria leída; nivel B: confirmación indirecta). El directorio oficial estuvo caído y los PDF de Salud rechazaron la conexión: el 100 % puede ser inalcanzable. Verificación telefónica plantea riesgos éticos (ver §6) |
| P2 | **Número de puntos de origen y de alternativas de transporte** | `N_o` = puntos de origen incluidos. Alternativas: `k(o,s) = nº de itinerarios distintos (secuencia de líneas) con t ≤ 1.25·t_min o ≤ t_min + 15 min`. Reportar `N_o`, mediana de `k` y % de pares con `k = 1` (sin alternativa) | conteo; conteo; % | r5r (`detailed_itineraries`, `max_rides`) | La cantidad de orígenes no mide calidad. Alternativas solo con modos con GTFS. Orígenes sintéticos (estaciones, terminales), nunca domicilios reales |
| P3 | **Disponibilidad de estimaciones de tiempo/costo/transbordos** | `P3 = N_par_completos / N_par_total · 100`, con par completo = tiene `T1`, `T2` y `T3` válidos. Desglosar los faltantes por causa: sin ruta, sin regla de tarifa, fuera de cobertura GTFS, servicio sin horario | % | Salida del motor + tabla de tarifas | Un «dato disponible» no es un dato correcto: acompañar con una validación manual de una muestra (p. ej., comparar 10 pares con un planificador público) |
| P4 | **Incompatibilidades entre horarios de atención y de transporte** | `P4 = Σ Incompatible(o,s,d) / N_par · 100`, por tipo de día; además número de pares con `Compat < 0.5` | % de pares; conteo | T5 | Ver T5. En el piloto debe reportarse como «pares con incompatibilidad observada bajo los supuestos X», no como barrera comprobada |
| P5 | **Comprensión de la información con escenarios ficticios** | `P5 = Σ respuestas correctas / (N_part · N_ítems) · 100`; también % de participantes que completan la tarea sin ayuda y tiempo por tarea. Ítems: identificar ruta, costo total, tiempo, horario límite y qué llevar | %; minutos | Prueba breve con escenarios inventados (sin historias personales), siguiendo lo propuesto en la Fase 3 del proyecto | Muestra pequeña (≈ 8-15): reportar descriptivo y cualitativo, sin pruebas de significancia. Diseñar los ítems y criterios de «correcto» antes de la prueba. Requiere consentimiento informado y pago justo a participantes |
| P6 | **Cumplimiento de privacidad** | `P6 = ítems cumplidos / ítems aplicables · 100` sobre una lista de verificación; ítems críticos (sin datos personales identificables, sin domicilios, sin geolocalización de personas, sin envío de orígenes reales a servicios externos, consentimiento y aviso de privacidad, retención limitada, almacenamiento cifrado) deben cumplirse al 100 % | % + binario por ítem crítico | Lista de verificación elaborada por el equipo y revisada por persona con experiencia en protección de datos | Es una autoevaluación. Conviene tratarlo como **condición de entrada (gate)**, no como % promedio. La norma aplicable depende de quién trata los datos (ver §6) |
| P7 | **Número de recomendaciones sustentadas** | `P7 = nº de recomendaciones que cumplen 3 criterios`: (i) vinculada a ≥ 1 indicador del piloto, (ii) fuente institucional con fecha, (iii) supuestos y limitaciones explícitos. Reportar `P7` y `P7 / total de recomendaciones` | conteo; % | Análisis del equipo | Define «sustentada»; si no, es subjetivo. Revisión por pares internos (dos personas) |

---

## 5. Factibilidad en un piloto de pocas semanas

Suposición: 4-6 semanas, equipo pequeño, sin acceso a datos personales. Estimación de esfuerzo orientativa, no medida.

| Indicador | Factible | Esfuerzo | Condición / riesgo principal |
|---|---|---|---|
| P1 Fuente y fecha | **Sí** | 1-1.5 semanas | Directorios oficiales inaccesibles o desactualizados; fijar nivel de verificación y tolerar < 100 % |
| P2 Orígenes y alternativas | **Sí** | 1 semana (tras validar GTFS) | Sin GTFS del transporte concesionado ni de Mexibús/Mexicable: las alternativas quedan sub-contadas; declararlo |
| P3 Disponibilidad de estimaciones | **Sí** | 0.5-1 semana | Requiere tabla de tarifas y GTFS válidos |
| P4 Incompatibilidades de horario | **Parcial** | 1 semana | Solo si los horarios de atención ILE se verifican con fuente; usar pocos servicios y reportar con cautela |
| T1-T3 (tiempo, costo, transbordos) | **Sí, con alcance reducido** | 1-2 semanas | Piloto solo con transporte masivo y corredores con GTFS; excluir microbús/combi y Edomex no cubierto o presentarlos como «no estimado» |
| T4 (accesibilidad) | **Sí** (tiempo mínimo y acumuladas) | 0.5 semana tras T1 | 2SFCA fuera de alcance |
| T5 (compatibilidad) | **Parcial** | ver P4 | Ídem |
| P5 Comprensión | **Parcial** | 1.5-2 semanas (diseño, recluta, aplicación, análisis) | Muestra pequeña; ética; reportar como exploratorio |
| P6 Privacidad | **Sí** | 0.5 semana (más continua) | Es un requisito de diseño; hacerlo antes de recolectar nada |
| P7 Recomendaciones | **Sí** | 0.5 semana al cierre | Depende de que los demás indicadores existan |

**Ruta crítica sugerida:**
1. Semana 1: descargar y validar el GTFS de SEMOVI (fechas de calendario, agencias, errores) y construir el extracto de OSM; fijar definiciones de «verificado», τ y ventana de salida. Si el GTFS no se puede descargar, el piloto no puede calcular T1-T5.
2. Semana 1-2: inventario de servicios con fuente y fecha (P1) y tabla de tarifas con fecha de la fuente.
3. Semana 2-3: ejecutar r5r para orígenes definidos (p. ej., 15-30 puntos: estaciones y terminales de la periferia, no domicilios).
4. Semana 3-4: indicadores T1-T5, P2-P4 y control de calidad manual (muestra de pares contra un planificador público).
5. Semana 4-5: prueba de comprensión (P5) y revisión de privacidad (P6).
6. Semana 5-6: recomendaciones (P7) y documento de limitaciones.

---

## 6. Riesgos y mitigaciones

### 6.1 Sobre la palabra «seguro»

1. **Ambigüedad.** «Seguro» puede referirse a (a) seguridad clínica del procedimiento («aborto seguro», término técnico de la OMS), (b) seguridad jurídica (marco legal vigente en la entidad), (c) seguridad personal en el trayecto o la zona (delito, acoso), (d) privacidad/ausencia de vigilancia. Los indicadores de este informe miden tiempo, costo, transbordos y horarios; **ninguno mide seguridad**. Usar la palabra implica una afirmación que los datos no sostienen.
2. **Etiquetado de territorios.** Calificar una colonia o alcaldía como «insegura» produce estigma, puede sesgar la política hacia mejoras para el «seguro» y no hacia el territorio con menor acceso, y puede perjudicar a quienes viven allí. El propio proyecto declara que no buscará clasificar territorios como seguros o inseguros (docs/recopilacion.md, sección «Resultados esperados»). Mantener coherencia en todo el material.
3. **Marco de la OMS.** La OMS define la calidad del aborto con seis atributos (efectivo, eficiente, accesible, aceptable/centrado en la persona, equitativo y seguro). La página oficial (leída) enumera como guía reemplazada «Safe abortion: technical and policy guidance for health systems» (2012); los seis atributos los obtuve de un resumen de buscador, no del texto de la guía. 🟡 Es decir, «seguro» ya es una dimensión de **calidad clínica** en el marco de la OMS, y mezclarla con «trayecto seguro» genera confusión.
4. **Falsa seguridad de la información.** Decir que un servicio o ruta es «seguro» puede llevar a que una persona confíe en información desactualizada. Cada dato debe llevar fecha de verificación y fuente.

**Cómo medir sin etiquetar territorios**

- **Describir condiciones observables, no atributos del lugar:** «tiempo mediano de 78 min desde el origen X al servicio Y, en día hábil, salida 7:00-9:00, GTFS de marzo 2026» en vez de «zona de difícil acceso».
- **Reportar distribuciones y umbrales**, no una categoría única por territorio: curva `% de orígenes alcanzando un servicio vs. tiempo`, con τ múltiples; sin colorear mapas en «bueno/malo».
- **Usar orígenes elegidos por el equipo** (estaciones, terminales) y nombrarlos como tales; no extrapolar a «toda la alcaldía».
- **Evitar mapas con corte binario y paletas semánticas** (rojo/verde); usar escalas continuas neutras, con leyenda de supuestos.
- **Agregar y suprimir:** presentar resultados agregados por tipo de origen y con un mínimo de casos por celda; no publicar tablas origen-servicio con granularidad que permita inferir trayectos de una persona.
- **Separar dimensiones:** si el proyecto quiere abordar seguridad personal, hacerlo con una pregunta específica («problemas reportados en el trayecto»), fuente distinta (p. ej., encuestas de victimización) y sin cruzar con el estatus del territorio; no incluirlo en el piloto.
- **Comunicar incertidumbre y exclusiones:** indicar qué modos no se modelaron (microbús, combi, Mexibús, Mexicable) para que la ausencia no se lea como «no hay transporte».
- **Lenguaje:** preferir «accesibilidad», «tiempo de traslado», «compatibilidad de horarios», «información verificada»; reservar «seguro/a» para citar de forma literal a una fuente que lo use (por ejemplo, «aborto seguro» de la OMS) y definirlo.

### 6.2 Otros riesgos

| Riesgo | Descripción | Mitigación |
|---|---|---|
| **Privacidad y reidentificación** | Los orígenes, destinos y horarios de personas en torno a servicios de aborto son datos sensibles en potencia. Un servicio externo de rutas (Google, etc.) recibiría pares origen-destino | Calcular localmente con r5r/OTP; usar solo orígenes sintéticos; no recolectar historias personales (el proyecto ya propone escenarios ficticios); minimizar logs; suprimir celdas pequeñas |
| **Marco legal** | La nueva LFPDPPP (DOF 20-mar-2025, última reforma 14-nov-2025) define datos sensibles y abroga la ley de 2010; las funciones del INAI pasaron a la Secretaría Anticorrupción y Buen Gobierno (según EY). Si se trabaja con dependencias, puede aplicar la ley para sujetos obligados. No leí el texto de la ley | Consultar a una persona especialista en protección de datos antes de recolectar; redactar aviso de privacidad. 🟡 |
| **Cobertura incompleta de transporte** | Sin GTFS de microbús/combi, Mexibús, Mexicable ni transporte concesionado de Edomex, los tiempos de periferia suelen estar sobrestimados o ser «sin ruta» | Declararlo; marcar «no estimado» en lugar de 0 o N/D genérico; si se quiere ampliar, considerar levantamiento colaborativo de rutas con consentimiento (fuera del piloto) |
| **Calidad del GTFS** | El feed tiene 3 errores y 9 advertencias según el validador de Mobility Database; el calendario de servicio puede haber vencido (la versión previa terminaba el 1-ene-2026) | Validar al inicio; confirmar fechas de calendario; si es necesario, ajustar manualmente |
| **Datos oficiales inaccesibles o desactualizados** | Sitios oficiales rechazaron la conexión; directorios con horarios viejos | Guardar copia con fecha; verificar por canales oficiales; marcar niveles de confianza (aquí 🟢🟡🔴) |
| **Tarifas cambiantes** | Tarifas ajustadas en abril 2026 (Suburbano), oct-2025 (Edomex) y posibles ajustes futuros | Tabla de tarifas con fecha y fuente, versionada; recalcular antes de publicar |
| **Interpretación causal** | Un tiempo largo no prueba que alguien no accedió; la EOD no mide estos viajes | Usar lenguaje descriptivo; no inferir uso ni demanda |
| **Licencias** | EOD INEGI: sin comercialización y con cita; WRI: CC (variante a confirmar); OSM: ODbL; GTFS SEMOVI: sin verificar | Registrar licencia por dataset; no redistribuir bases brutas hasta confirmar |
| **Uso de la información** | Un mapa puede ser usado por actores contrarios al acceso para localizar servicios o puntos de apoyo | Evaluar qué se publica (servicios ya públicos vs. organizaciones de acompañamiento); no incluir colectivas ni acompañantes en el inventario público |

---

## 7. Fuentes

✔ = leída directamente en esta sesión (descarga y extracción de texto). Sin ✔ = solo vista como resultado de buscador o no abierta.

### Metodología y guías
- ✔ BID, Hansz, Hernández y Rubinstein. *¿Qué implica la accesibilidad en el diseño e implementación de políticas públicas urbanas?* Nota técnica IDB-TN-1562, dic. 2018 (CC-IGO 3.0 BY-NC-ND). https://webimages.iadb.org/publications/2019-01/Nota_Tecnica_14.12.18.pdf
- ✔ Banco Mundial. *Mobility and Transport Connectivity Series: Connectivity for Human Capital* (informe sobre accesibilidad a salud y educación en ciudades africanas; título exacto no confirmado). https://openknowledge.worldbank.org/bitstreams/34637a4c-7a73-5a37-aff6-a8315189a7d5/download
- ✔ WRI México. *Índice de Desigualdad Urbana* (Brito, Macías, Ramírez, Jacquin, Zubicaray), documento de trabajo, enero 2021. https://es.wri.org/sites/default/files/IDU%205012021-NRC-OK.pdf
- ✔ ITDP. «Visualizing Urban Accessibility in Mexico and Beyond», 6-ago-2024. https://framework.itdp.org/2024/08/06/visualizing-accessibility-in-mexican-cities-and-beyond/
- ✔ OMS. *Abortion care guideline* (8-mar-2022), página de publicación (leída solo la descripción). https://www.who.int/publications/i/item/9789240039483
- Resúmenes de buscador (no abiertos o parcialmente leídos): OMS, comunicado 9-mar-2022 https://www.who.int/europe/news/item/09-03-2022-who-releases-new-guidelines-on-safe-abortion · 2SFCA (Luo y Wang 2003; Langford, Higgs y Fry 2015) https://en.wikipedia.org/wiki/Two-step_floating_catchment_area_method y https://pure.southwales.ac.uk/en/publications/measuring-access-to-primary-health-care-using-two-step-floating-c/ · Penchansky y Thomas 1981 (resumen) https://pmc.ncbi.nlm.nih.gov/articles/PMC1464050 · Braga, Loureiro y Pereira (2023), *J. Transport Geography* https://ideas.repec.org/a/eee/jotrge/v109y2023ics0966692323000625.html · Javanmard et al. (2023) https://ideas.repec.org/a/eee/jotrge/v106y2023ics096669232200223x.html · BID, «¿Qué tan asequible es el transporte en América Latina y el Caribe?» https://publications.iadb.org/es/que-tan-asequible-es-el-transporte-en-america-latina-y-el-caribe

### Herramientas
- ✔ CRAN, paquete r5r (v2.4.0, MIT, 2026-05-20). https://cran.r-project.org/web/packages/r5r/index.html
- ✔ r5r, viñeta «Accessibility» / introducción. https://search.r-project.org/CRAN/packages/r5r/vignettes/r5r.html y https://search.r-project.org/CRAN/packages/r5r/vignettes/isochrones.html
- ✔ Pereira et al. (2021), «r5r: Rapid Realistic Routing on Multimodal Transport Networks with R5 in R», *Findings*. https://doi.org/10.32866/001c.21262 (solo se leyó el encabezado)
- ✔ Licencia R5 (MIT). https://raw.githubusercontent.com/conveyal/r5/master/LICENSE
- ✔ OpenTripPlanner: LICENSE (LGPL v3) y README. https://raw.githubusercontent.com/opentripplanner/OpenTripPlanner/dev-2.x/LICENSE y https://raw.githubusercontent.com/opentripplanner/OpenTripPlanner/dev-2.x/README.md
- ✔ Valhalla: COPYING (MIT) y README. https://raw.githubusercontent.com/valhalla/valhalla/master/COPYING y https://raw.githubusercontent.com/valhalla/valhalla/master/README.md
- ✔ OpenStreetMap, aviso de copyright. https://www.openstreetmap.org/copyright
- GTFS Schedule Reference (página descargada, no analizada en detalle). https://gtfs.org/documentation/schedule/reference/

### Datos abiertos y encuesta
- ✔ Mobility Database, feed SEMOVI `mdb-1830`. https://mobilitydatabase.org/feeds/gtfs/mdb-1830
- ✔ Banco Mundial, Data Catalog: GTFS de la Ciudad de México (CC BY 4.0). https://datacatalog.worldbank.org/search/dataset/0038247/mexico-city-mexico-general-transit-feed-specification-gtfs
- Portal de datos abiertos CDMX, ficha GTFS (**inaccesible: connection reset**). https://datos.cdmx.gob.mx/dataset/gtfs
- SIEG CDMX, metadatos GTFS (CentroGeo; **inaccesible**; cita vía buscador). https://sieg.cdmx.gob.mx/layers/geonode%3Agtfs_general_transit_feed_specifications_cdmx/pdf_metadata_layer
- ✔ INEGI, EOD 2017: catálogo RNM 533. https://www.inegi.org.mx/rnm/index.php/catalog/533
- ✔ INEGI, programa EOD 2017 (solo título legible). https://www.inegi.org.mx/programas/eod/2017/
- ✔ WRI México (Santana et al., 2023). *Base de datos ajustada de la EOD para la ZMVM, 2017.* Documento: https://es.wri.org/sites/default/files/2023-10/23_WRI%20TEMPLATE_A4_Working%20Paper-EOD%209%20OCTUBRE%20-.pdf · DOI: https://doi.org/10.46830/wriwp.19.00078 · CSV: https://files.wri.org/es/eod_bd_reprocesadaWRI_4.1_Viajes_diaHabil.csv y https://files.wri.org/es/eod_bd_reprocesadaWRI_5_Transporte.csv
- ✔ Changing Transport, «How data moves cities in Mexico» (GTFS de SEMOV Edomex, Toluca y Jilotepec), 2026. https://changing-transport.org/how-data-moves-cities-in-mexico/
- ✔ Citymapper, «Fuentes para Citymapper CDMX». https://citymapper.com/news/459/fuentes-para-citymapper-cdmx
- Directorio ILE de la Secretaría de Salud CDMX (**página con error de PHP/WordPress**). https://ile.salud.cdmx.gob.mx/directorio-clinicas-interrupcion-legal-del-embarazo · PDF de Salud CDMX (**conexión rechazada**). https://www.salud.cdmx.gob.mx/storage/app/uploads/public/665/371/b75/665371b758d0b670589421.pdf

### Tarifas y horarios (prensa)
- ✔ TV Azteca, «¿Cuánto cuesta el pasaje en CDMX?» (1-jun-2026). https://www.tvazteca.com/aztecanoticias/cuanto-cuesta-el-pasaje-en-cdmx-las-tarifas-actualizadas-metro-metrobus-trolebus-camiones-mundial-2026/
- ✔ UnoTV, «Tarifas oficiales del transporte público en la CDMX». https://www.unotv.com/estados/ciudad-de-mexico/tarifas-del-transporte-publico-de-la-cdmx/
- ✔ ADN40, «Clara Brugada confirma el precio oficial del Metro CDMX para 2026». https://www.adn40.mx/ciudad/2025-12-15/clara-brugada-confirma-precio-oficial-metro-cdmx-2026/
- ✔ Chilango, «Tren Suburbano sube su tarifa» (6-abr-2026). https://www.chilango.com/noticias/transporte/tren-suburbano-sube-su-tarifa-asi-queda-el-costo-del-viaje-en-2026/
- ✔ ADN40, «Suben las tarifas del Suburbano…» (oct-2026). https://www.adn40.mx/ciudad/2026-10-05/golpe-al-bolsillo-suben-las-tarifas-del-suburbano-y-el-transporte-de-teotihuacan-a-cdmx/
- ✔ Chilango, «Aumenta el precio del Mexicable y el Mexibús» (16-oct-2025). https://www.chilango.com/noticias/transporte/precio-mexicable-mexibus-cuanto-cuesta-subir-transportes-edomex/
- Horarios (fragmentos de buscador, páginas no abiertas): https://www.tvazteca.com/aztecanoticias/horario-metro-metrobus-trolebus-camiones-y-otros-medios-transporte-publico-cdmx · https://www.unotv.com/estados/ciudad-de-mexico/horarios-de-la-red-de-transporte-por-semana-santa-en-cdmx/
- Mexicable (fragmentos): https://www.excelsior.com.mx/comunidad/tarifazo-edomex-cuanto-cuesta-pasaje-mexicable-mexibus-aumento-2025/1750145

### Marco legal de datos personales
- Cámara de Diputados, LFPDPPP vigente (no abierta). https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf · EY, *Law Flash* sobre la nueva LFPDPPP (no abierta). https://www.ey.com/content/dam/ey-unified-site/ey-com/es-mx/technical/tax/documents/ey-law-flash-nueva-lfpdppp.pdf

### Sitios oficiales que rechazaron la conexión (no verificados)
datos.cdmx.gob.mx · sieg.cdmx.gob.mx · www.metro.cdmx.gob.mx · www.metrobus.cdmx.gob.mx · cablebus.cdmx.gob.mx · semovi.cdmx.gob.mx · www.salud.cdmx.gob.mx · github.com (403 desde este entorno; se usó raw.githubusercontent.com) · accesibilidad.itdp.mx

---

## 8. Pendientes para cerrar la verificación

1. Descargar el GTFS de SEMOVI desde un entorno con acceso, listar `agency.txt`, validar fechas de `calendar.txt`/`calendar_dates.txt`, contar rutas por agencia y revisar si hay `fare_attributes.txt`.
2. Confirmar la licencia del conjunto GTFS en datos.cdmx.gob.mx (y la del portal) y la fecha de actualización oficial.
3. Confirmar con Metrobús, Metro, Cablebús y STE los horarios y tarifas vigentes por vía oficial.
4. Confirmar la variante de licencia Creative Commons de la base ajustada de WRI y descargar los CSV.
5. Buscar GTFS de Mexibús/Mexicable/Edomex ZMVM directamente con SEMOV Edomex o el repositorio de MapaData; confirmar que no existen o su estado.
6. Verificar con una fuente institucional el directorio actualizado de unidades ILE, sus horarios y su duración mínima de atención (necesaria para T5/P4).
7. Revisar el texto de la LFPDPPP (y, si aplica, la ley para sujetos obligados) con una persona especialista antes de recolectar datos.
