# 05 · Verificación de cifras ILE e inventario preliminar de unidades (CDMX)

Proyecto Ruta Libre (Chilangatón 2026, equipo CATTION). Investigación realizada el 25-oct-2026.
Leyenda de confianza: 🟢 fuente primaria leída directamente por mí · 🟡 fuente secundaria (prensa, organismo autónomo que cita datos oficiales, o cálculo propio a partir de fuentes leídas) · 🔴 no verificado.
✔ = leído directamente (descargué y extraje el texto). Los archivos temporales están en `/tmp/claude-0/agente5/`. No se modificó `data/servicios-ile-cdmx.json`.

---

## 1. Resumen

1. **Se logró leer los PDF oficiales de estadísticas del portal ile.salud.cdmx.gob.mx**, aunque las páginas HTML del portal están rotas (error de WordPress/MySQL). Los PDF viven en `/wp-content/uploads/` y sí se descargan. Encontré cuatro cortes (nov-2022, may-2023, mar-2024, jun-2024) y el informe de IMSS-Bienestar jul-2024 a jun-2025.
2. **Confirmadas con fuente primaria 🟢:** 277,268 acumulado (el corte es **30 de junio de 2024**, no julio), 12,822 ILE de IMSS-Bienestar jul-2024 a jun-2025 y la composición por entidad de residencia a esos cortes.
3. **Confirmadas por prensa que cita el informe 🟡:** 19,300 ILE de IMSS-Bienestar jul-2024 a dic-2025, 13,610 residentes de CDMX y 4,170 del Estado de México. No pude abrir el PDF jul-2024 a dic-2025 (no localicé su URL).
4. **252,760 (abr-2007 a ago-2022):** 🟡. Lo reporta Publimetro citando a la Sedesa. El PDF de nov-2022 que sí leí 🟢 es coherente (255,841 a nov-2022; restando sep-nov da 252,723, diferencia de 37 por ser cifras preliminares).
5. **Dos cifras no se pueden dar por buenas como están escritas:** "67 de otros países" (acumulado de extranjeras, no del periodo IMSS-Bienestar; inferencia 🟡) y "78,806 de otras entidades" (🔴, no aparece en ninguna fuente; ver sección 2).
6. **Conflicto 70 % vs ~31 %:** se resuelve a favor de ~31-36 % de usuarias no residentes. El "70 %" de El Financiero no es consistente con ningún dato oficial; lo más probable es que sea la proporción de **residentes** de CDMX invertida (en 2018 era 70.4 % residentes). Ver sección 3.
7. **Inventario:** 14 unidades con producción registrada en el informe oficial de IMSS-Bienestar (jun-2025) más Hospital General Ajusco Medio (listado en 2022, "sin servicio" en las estadísticas). Hay discrepancias de domicilio, teléfono y horario entre el JSON del repo y las fichas del portal oficial (sección 4.3).
8. **ILE vs IVE:** en la Ley de Salud local, ILE es la interrupción a solicitud hasta 12 semanas completas; IVE es la interrupción por violación sexual sin denuncia previa (hasta 20 semanas con 6 días según los lineamientos de 2018). No encontré una fuente oficial que asigne IVE o semanas por unidad (🔴).

---

## 2. Tabla cifra por cifra

| # | Valor citado en el documento | Valor verificado | Fuente (página/tabla) | Confianza |
|---|---|---|---|---|
| 1 | 252,760 ILE (abr-2007 a ago-2022) | **252,760** reportado por la Sedesa. El PDF oficial del corte de agosto no se pudo descargar. El corte oficial más cercano que leí es 255,841 a 30-nov-2022, y 254,878 a 31-oct-2022. Cálculo: 255,841 − (sep 1,074 + oct 1,048 + nov 996) = 252,723, que cuadra con 252,760 dentro del margen de datos preliminares. | Publimetro 30-sep-2022 (cita Sedesa). PDF `WEB_2022_noviembre.pdf`, p. 2 (tabla por año) y p. 5 (mensual). | 🟡 (cifra) / 🟢 (corte cercano) |
| 2 | 277,268 acumulado (corte jun o jul 2024, según fuente) | **277,268, corte 30 de junio de 2024.** La portada del PDF dice "Abril 2007 – 30 de Junio 2024". La nota de Milenio/Sedesa de sep-2024 dice "julio"; está equivocada o usa el mes de publicación. Coherencia: 273,723 a 31-mar-2024 + 3,545 del 2.º trimestre (3,447 + corrección del 1.º trimestre 3,562→3,660) = 277,268. | `ILE-WEB-jun2024.pdf`, p. 3 (tabla anual, "Total 277,268") y p. 4 (por trimestre). CDHCM boletín 33/2025 también dice "abril de 2007 a junio de 2024". | 🟢 |
| 3 | 19,300 ILE IMSS-Bienestar CDMX (jul-2024 a dic-2025) | **19,300** según La Razón (28-sep-2026) y La Jornada Hidalgo, ambos citando el informe "Productividad del Programa ILE jul-2024 a dic-2025" de la Coordinación Estatal IMSS-Bienestar. Parcial verificado en primario: jul-2024 a jun-2025 = **12,822** (5,947 en jul-dic 2024 + 6,875 en ene-jun 2025, cifra de 2025 preliminar). Implica ~6,478 de jul-dic 2025 (no verificado). | PDF `ILE-WEB-jul2024-jun2025.pdf`, p. 1 (mensual y por unidad). La Razón y La Jornada Hidalgo para 19,300. | 🟡 (19,300) / 🟢 (12,822) |
| 4 | 13,610 residentes de CDMX | **13,610** de 19,300, según La Jornada Hidalgo (cita el informe). Equivale a 70.5 %. Primario parcial: 8,251 residentes en jul-2024 a jun-2025 (64.4 % de 12,822). | La Jornada Hidalgo (nota sobre Hidalgo). PDF jul2024-jun2025, p. 3 ("ILE por entidad de residencia"). | 🟡 |
| 5 | 4,170 del Estado de México | **4,170** (jul-2024 a dic-2025), según La Razón. **Alerta de consistencia:** el primario da 3,528 solo para jul-2024 a jun-2025; entonces jul-dic 2025 tendría apenas 642 de ~6,478 (≈10 %, contra 27.5 % en los 12 meses previos). Puede ser un cambio real o un problema en el dato. Pendiente de confirmar con el PDF completo. | La Razón 28-sep-2026. PDF jul2024-jun2025, p. 3 (México 3,528). | 🟡 |
| 6 | 67 de otros países | **No hay fuente directa.** El acumulado oficial de "Extranjeros" es 64 a jun-2024; el informe jul-2024 a jun-2025 suma 3 extranjeras (Cuba, Venezuela, Guatemala). 64 + 3 = **67**, así que 67 parece ser el acumulado histórico de extranjeras (2007 a jun-2025), no una cifra del periodo IMSS-Bienestar. También cuadra: 19,300 − 5,514 (otras entidades) = 13,786 = 13,610 + 176 (extranjeras + "no aplica/no especificado"). Inferencia, no cita. | PDF jun2024, p. 7 (Extranjeros 64). PDF jul2024-jun2025, p. 3. Cálculo propio. | 🔴/🟡 (inferencia) |
| 7 | 78,806 de otras entidades | **No encontré esta cifra en ninguna fuente.** Datos comparables: no residentes a jun-2024 = 277,268 − 189,525 = **87,743** (31.6 %); a mar-2024 = 86,434; a nov-2022 = 79,979; a ago-2022 ≈ 78,892 (252,760 − 173,868 de Milenio). Hipótesis (no confirmada): 78,806 sería el total de no residentes al corte de agosto de 2022. Recomendación: no publicar 78,806 hasta localizar su origen. | PDFs `ILE-WEB-jun2024` (p. 7), `ILE-WEB-mzo2024` (p. 7), `WEB_2022_noviembre` (p. 6), entidad de procedencia. Milenio vía buscador. | 🔴 |
| 8 | (implícito) 87,743 no residentes y 77,160 Edomex | **Confirmado**: Ciudad de México 189,525; Estado de México 77,160; Puebla 1,709; Hidalgo 1,459; Morelos 1,066; Querétaro 779; Extranjeros 64; No especificado 15 (suma 277,268). | PDF `ILE-WEB-jun2024.pdf`, p. 7 (tabla "Entidad de Procedencia"). | 🟢 |
| 9 | (implícito) 5,514 de otras entidades en jul24-dic25 | 5,514 "al menos", de ellas Edomex 4,170, Puebla 221, Oaxaca 189, Veracruz 151, Hidalgo 124, Guerrero 104. "Casi tres de cada diez" (28.6 %). | La Razón 28-sep-2026. | 🟡 |

Observaciones adicionales a corregir en el documento del proyecto:
- Las cifras anuales fueron revisadas: el año 2014 pasó de 20,559 a 19,971 por depuración de 588 duplicados (nota en la p. 2 del PDF de mar-2024; el PDF de jun-2024 ya trae el dato revisado). Totales anteriores a mar-2024 no son estrictamente comparables.
- Desde julio de 2024 las estadísticas están "federalizadas" (CDHCM) y las publica la Coordinación Estatal de IMSS-Bienestar; el informe de 2025 es "preliminar sujeto a revisión". GIRE señala que la información de CDMX dejó de actualizarse con la periodicidad previa (reportado por buscador; no leí la frase directamente).
- Total anual reciente: 2023 = 13,677; 2022 = 12,876; 2021 = 12,295; 2020 = 11,269; 2019 = 15,173 (PDF mar-2024 y jun-2024). La Razón menciona 13,353 para 2025 (🟡, solo titular).

---

## 3. Resolución del conflicto "cerca del 70 %" vs "~31-32 %"

**Dato en disputa**
- El Financiero (26-abr-2022, Alberto Valiente) ✔ lee: "Entre 2020 y 2021, 70 % de los abortos practicados en la CDMX fueron a mujeres de otras entidades" (pie de foto) y "más de 20 mil interrupciones… de las cuales cerca del 70 por ciento correspondieron a mujeres de otros estados" (cuerpo). Es una "estimación" atribuida a "las autoridades capitalinas", sin tabla ni enlace.
- Expansión/CDHCM: ~31-32 % acumulado de no residentes.

**Evidencia oficial leída (porcentaje de residentes de CDMX respecto al total acumulado)**

| Corte | Total | Residentes CDMX | % CDMX | % no CDMX | Fuente | Conf. |
|---|---|---|---|---|---|---|
| 18-abr-2018 | 194,153 | 136,655 | 70.4 % | 29.6 % | Chilango (cita Sedesa) ✔ | 🟡 |
| 30-nov-2022 | 255,841 | 175,862 | 68.7 % | 31.3 % | PDF nov-2022 p. 6 ✔ | 🟢 |
| 30-may-2023 | 263,267 | 180,778 | 68.7 % | 31.3 % | PDF may-2023 p. 6 ✔ y CNDH Informe 2024, tabla 2 ✔ | 🟢 |
| 31-mar-2024 | 273,723 | 187,289 | 68.4 % | 31.6 % | PDF mar-2024 p. 7 ✔ | 🟢 |
| 30-jun-2024 | 277,268 | 189,525 | 68.4 % | 31.6 % | PDF jun-2024 p. 7 ✔ | 🟢 |

**Flujo reciente (diferencias entre cortes, cálculo propio sobre PDF leídos)**
- Dic-2022 a jun-2024: Δ residentes CDMX 13,663 de Δ total 21,427 = 63.8 % residentes, 36.2 % no residentes. Edomex por sí solo: 7,142 de 21,427 = 33.3 %.
- Abr-jun 2024: 63.1 % residentes.
- Jul-2024 a jun-2025 (IMSS-Bienestar): 8,251 de 12,822 = 64.4 % residentes; 35.6 % no residentes (Edomex 27.5 %).
- Jul-2024 a dic-2025 (prensa): 13,610 de 19,300 = 70.5 % residentes; 29.5 % no residentes (ver alerta en fila 5).
- 2016-2021: CDHCM boletín 45/2022 ✔ dice 36 % de 91,698 servicios fueron de mujeres de otros estados (cita datos abiertos CDMX).
- 2020: Milenio (vía buscador, 🟡 no leída) reporta 3,485 mexiquenses de 11,269 (30.9 %) frente a 4,858 de 15,173 en 2019 (32.0 %).
- CDHCM boletín 33/2025 ✔: 68 % CDMX, 28 % Edomex, 4 % otras (acumulado a jun-2024). Boletín 50/2024 ✔: primer cuatrimestre 2023, 3,167 de 4,917 residentes (64.4 %), 1,606 Edomex, 142 otras, 2 extranjeras.

**Conclusión**
- Ningún dato oficial ni de ningún corte anual permite sostener que ~70 % fuera de usuarias de otras entidades. La proporción de no residentes ha estado entre ~29 % y ~38 % en todos los cortes revisados.
- El 70 % coincide casi exactamente con la proporción de **residentes** de CDMX (70.4 % en 2018; ~68 % acumulado). Lo más probable es una inversión o malinterpretación en la nota de El Financiero. Esto es **inferencia**, no una aclaración documentada; no encontré rectificación.
- Además, la nota habla de "más de 20 mil" ILE en 2020-2021; el total oficial de esos dos años es 11,269 + 12,295 = 23,564, así que ese volumen sí es correcto y solo la proporción falla.
- **Recomendación para Ruta Libre:** usar "alrededor de un tercio (≈31-36 %) de las personas atendidas no residen en la CDMX" con cita del PDF oficial de jun-2024 (31.6 % acumulado) y del informe IMSS-Bienestar (35.6 % en jul24-jun25). No usar "70 %".
- Limitación: **no existe desglose anual por entidad de residencia publicado en los PDF leídos** (solo acumulados y, desde 2024, periodos de 12 meses). El desglose anual vive en el conjunto de datos abiertos `datos.cdmx.gob.mx/dataset/interrupcion-legal-del-embarazo`, que no se pudo abrir (ver sección 6).

---

## 4. Inventario preliminar de unidades que ofrecen ILE en la CDMX

### 4.1 Cómo se arma la lista
- Base: unidades con producción registrada en el informe oficial de IMSS-Bienestar jul-2024 a jun-2025 ✔ (14 unidades, p. 1) más Ajusco Medio.
- Datos de domicilio, horario y teléfono: fichas individuales del portal ile.salud.cdmx.gob.mx. **Las fichas no abren hoy** (error PHP/MySQL); los datos vienen de extractos del buscador (🟡) y de Expansión 2020 ✔ y Publimetro 2022 ✔. Las fichas tienen antigüedades de ~1 a ~10 años según el buscador; confirmar por teléfono.
- Servicios: "ILE" = hasta 12 semanas completas. Tipo de procedimiento por unidad: solo hay clasificación en prensa (Publimetro 2022) y en las fichas (servicio quirúrgico cerrado "hasta nuevo aviso" en algunas). **No hay fuente oficial por unidad para IVE (violación) ni para semanas** (🔴).
- Institución: todas están hoy bajo la Coordinación Estatal de IMSS-Bienestar de la CDMX (informe oficial ✔), antes Sedesa/Servicios de Salud Pública de la CDMX.

### 4.2 Tabla

"ILE jul24-jun25" es la productividad registrada en el informe de IMSS-Bienestar. "Fecha/fuente" se refiere a la fuente del dato de horario/domicilio. Teléfono común de la red: 55 5038 1700 + extensión.

| # | Unidad | Alcaldía | Dirección (según ficha/prensa) | Horario (ficha) | Tipo de servicio ILE | ILE jul24-jun25 | Institución | Fecha/fuente | Conf. |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Centro de Salud T-III Cuajimalpa | Cuajimalpa | Av. y Cda. de Juárez s/n, Cuajimalpa (Expansión 2020) | Mié a vie desde 7:00; ext. 6610 | Solo medicamento (Publimetro 2022) | 381 | IMSS-Bienestar CDMX | Ficha portal (buscador); Publimetro 30-sep-2022 | 🟡 |
| 2 | Clínica Integral de la Mujer "Hermila Galindo" | La Magdalena Contreras | Av. Ojo de Agua esq. San Jerónimo, col. Huayatla | L a V desde 8:00 (recomienda llegar 7:00); ext. 7265 | Solo medicamento (Publimetro 2022) | 509 | IMSS-Bienestar CDMX | Ficha (~479 días de antigüedad) | 🟡 |
| 3 | Centro de Salud T-III Miguel Hidalgo | Tláhuac | Calle Fidelio esq. Deodato s/n, col. Miguel Hidalgo, CP 13200 | L a V desde 7:00; ext. 7550 | Solo medicamento | 287 | IMSS-Bienestar CDMX | Ficha (buscador) | 🟡 |
| 4 | Clínica Comunitaria Santa Catarina | Iztapalapa | Calle Nuevo León Mz 38 Lt 9, col. Miguel de la Madrid (Expansión 2020) | L a V desde 7:00; quirúrgico cerrado "hasta nuevo aviso" | Medicamento | 1,026 | IMSS-Bienestar CDMX | Ficha (buscador); Expansión 28-sep-2020 | 🟡 |
| 5 | Centro de Salud T-III México España | Miguel Hidalgo | Entrada por Lago Iseo; col. Mariano Escobedo/Anáhuac (Expansión: "Mariano Escobedo 148, Anáhuac") | L a V desde 7:30; ext. 7378 | Medicamento y quirúrgico | 2,537 | IMSS-Bienestar CDMX | Ficha (buscador); Publimetro 2022 | 🟡 |
| 6 | Centro de Salud T-III Dr. Juan Duque de Estrada | Venustiano Carranza | Oriente 170 No. 154, col. Moctezuma 2.ª Sección (Expansión 2020) | **Todos los días incluidos festivos**: entre semana desde 7:00, fines de semana 8:00-19:30; ext. 7740 | Medicamento y quirúrgico | 2,870 | IMSS-Bienestar CDMX | Ficha (buscador) | 🟡 |
| 7 | Clínica de Salud Reproductiva del CS T-III Beatriz Velasco de Alemán | Venustiano Carranza | Av. Ing. Eduardo Molina esq. Peluqueros s/n, col. Michoacana, **CP 15300** (ficha) | L a V desde 7:00; no atiende sáb/dom/festivos; ext. 7728; **servicio quirúrgico cerrado hasta nuevo aviso** (ficha de ~572 días) | Medicamento (quirúrgico suspendido en ficha) | 1,749 | IMSS-Bienestar CDMX | Ficha (buscador) | 🟡 |
| 8 | Hospital General Dr. Enrique Cabrera | Álvaro Obregón | Av. Centenario (domicilio completo no obtenido en ficha) | L a V 7:00-14:00; tel. 55 1285 7100 ext. 5081 | Medicamento y quirúrgico | 341 | IMSS-Bienestar CDMX | Ficha (buscador) | 🟡 |
| 9 | Hospital Materno Infantil Cuautepec | Gustavo A. Madero | Av. Emiliano Zapata 17, col. Cuautepec Barrio Bajo, **CP 07210** | L a V 7:00-14:00 (habitual); ficha dice "fuera de servicio en junio de 2024" | Medicamento y quirúrgico | **70** (muy baja) | IMSS-Bienestar CDMX | Ficha (buscador) | 🟡 |
| 10 | Hospital Materno Infantil Dr. Nicolás M. Cedillo | Azcapotzalco | Gustavo J. s/n esq. Víctor Hernández Covarrubias, col. Unidad Francisco Villa, **CP 02400** | L a V 7:00-15:00; tel. 55 5394 0565 | Medicamento y quirúrgico | 455 | IMSS-Bienestar CDMX | Ficha (buscador) | 🟡 |
| 11 | Hospital Materno Infantil Inguarán | Venustiano Carranza | Estaño 307, col. Felipe Ángeles, CP 15310 | L a V 7:00-14:00; tel. 55 5795 6764 | Medicamento y quirúrgico | 905 | IMSS-Bienestar CDMX | Ficha (~1,000 días) | 🟡 |
| 12 | Hospital Materno Infantil Tláhuac | Tláhuac | Av. Tláhuac-Chalco 231 (Expansión 2020: col. La Habana) | L a V 7:00-15:00; tel. 55 5842 3601; llegar a 7:00 en ayuno | Medicamento y quirúrgico | 631 | IMSS-Bienestar CDMX | Ficha (buscador); Expansión 2020 | 🟡 |
| 13 | Hospital Materno Pediátrico Xochimilco | Xochimilco | Calzada Nativitas y 16 de Septiembre s/n, barrio Xaltocan, CP 16090 | Habitual L a V 7:00-14:00; **ficha: "fuera de servicio hasta nuevo aviso"** | Medicamento y quirúrgico | 662 | IMSS-Bienestar CDMX | Ficha (buscador) | 🟡 |
| 14 | Hospital General Ticomán | Gustavo A. Madero | Plan de San Luis s/n entre Miguel Bernard y Bandera, col. Ticomán, CP 07330 | L a V 6:30-14:00; ext. 7175 | Medicamento y quirúrgico | 399 | IMSS-Bienestar CDMX | Ficha (buscador) | 🟡 |
| 15 | Hospital General Ajusco Medio Dra. Obdulia Rodríguez Rodríguez | Tlalpan | Encinos 41, col. Ampliación Miguel Hidalgo, CP 14250 | L a V 8:00-14:00 (ficha de ~3,700 días de antigüedad) | Sin dato | **0 en el informe; estadísticas dicen "sin servicio por COVID"** | IMSS-Bienestar CDMX | Ficha antigua; PDF 2024 (nota al pie) ✔ | 🟡/🔴 estado actual |

Total jul24-jun25 de las 14 unidades con producción = **12,822** ✔ (suma coincide con el total del informe). Las 3 unidades con más volumen (Duque de Estrada, México España, Velasco de Alemán) concentran 7,156 (55.8 %): cálculo propio.

Unidades que **dejaron** de brindar el servicio (acumulado histórico a jun-2024 ✔, PDF jun-2024 p. 6): HMI Cuajimalpa, HMI Magdalena Contreras, HMI Topilejo, HE Belisario Domínguez, HG Balbuena, HG Iztapalapa, HG Milpa Alta, HG Gregorio Salas y HG Ajusco Medio.

Unidades fuera del sistema CDMX/IMSS-Bienestar que, según prensa, se sumaron: IMSS ordinario, 4 unidades desde el 6-mar-2026 (HGO 3-A Magdalena de las Salinas, HGZ Paso Troncoso, UMAE 3 La Raza, UMAE 4 Luis Castelazo Ayala) según Chilango 19-mar-2026 ✔ 🟡. ISSSTE: el acuerdo de feb-2025 se menciona en el boletín CDHCM 33/2025 ✔, que habla de "14 hospitales y clínicas" en CDMX; esa frase es ambigua y no lista unidades (🔴).

Cuántas unidades hay (la lista "cambia entre publicaciones"):

| Fuente | Fecha | Núm. unidades | Nota |
|---|---|---|---|
| Expansión ✔ | 28-sep-2020 | 9 operativas + 2 hospitales suspendidos | Pandemia |
| Publimetro ✔ | 30-sep-2022 | 15 | Incluye Ajusco Medio |
| CDHCM boletín 50/2024 ✔ | 26-abr-2024 | 14 | |
| Informe IMSS-Bienestar ✔ | jun-2025 | 14 con producción | Primario |
| Buscador sobre portal ILE | oct-2026 | "8 unidades médicas y 7 hospitales" = 15 | No coincide con 14; la 15.ª no está identificada (🔴) |
| La Razón ✔ | 28-sep-2026 | 15 | |
| Chilango ✔ | 19-mar-2026 | 14 + 4 IMSS | |

### 4.3 Contraste con `data/servicios-ile-cdmx.json` (solo lectura)

El JSON contiene 14 registros (7 centros de salud/clínicas y 7 hospitales, ids `ile-cs-01..07` e `ile-hosp-01..07`). **Coincide la lista de nombres con las 14 unidades del informe IMSS-Bienestar.** No incluye Ajusco Medio. No trae campos `fuente` ni `fecha` (imprescindibles para la promesa de "fuentes y fechas de actualización"). No contiene un campo de IVE/violación ni de semanas.

| Unidad | Campo | JSON | Fuente consultada | Comentario |
|---|---|---|---|---|
| Todas | Horario | Casi todas "Lunes a Viernes 08:00-15:00" (hospitales 07:00-14:00) | Fichas: horarios distintos por unidad | El JSON parece genérico |
| Todas los centros | Teléfono | Números directos (55 5812 0787, etc.) | Fichas: 55 5038 1700 + extensión | No cotejables; 🔴 |
| Cuajimalpa | Horario | L-V 8-15 | Ficha: mié-vie desde 7:00 | Discrepa |
| Duque de Estrada | Horario | L-V 8-15 | Ficha: todos los días, incluidos festivos | Discrepa (importante para usuarias) |
| Velasco de Alemán | CP / quirúrgico | 15240; AMEU | Ficha: CP 15300; quirúrgico cerrado hasta nuevo aviso | Discrepa |
| Santa Catarina | Quirúrgico | Solo medicamento | Ficha: quirúrgico cerrado | Coincide |
| Hospital Cuautepec | CP | 07100 | Ficha: 07210 | Discrepa |
| Hospital Cedillo | CP | 02420 | Ficha: 02400 | Discrepa |
| Hospital Inguarán | Teléfono | 55 5795 3650 | Ficha: 55 5795 6764 | Discrepa |
| Hospital Cabrera | Teléfono | 55 5585 1066 | Ficha: 55 1285 7100 ext. 5081 | Discrepa |
| Hospital Tláhuac | Colonia / horario | La Loma, 07-14 | Expansión 2020: La Habana; ficha 7-15 | Discrepa (revisar) |
| Hospital Xochimilco | Estado | Activo | Ficha: "fuera de servicio hasta nuevo aviso", pero con 662 ILE en jul24-jun25 | Revisar |
| Hospital Cuautepec | Estado | Activo | Ficha: "fuera de servicio en junio de 2024"; solo 70 ILE | Revisar |
| Ticomán | Domicilio | Cerrada Plan de San Luis 7, La Purísima Ticomán | Ficha: Plan de San Luis s/n, col. Ticomán | Variación menor |
| Miguel Hidalgo (Tláhuac) | Domicilio | Fidelio s/n | Ficha: Fidelio esq. Deodato s/n | Coincide |

Las coordenadas del JSON no se pudieron verificar (🔴). Todos los datos de contacto y horario del JSON deberían tratarse como 🔴 hasta tener fecha y fuente por registro.

---

## 5. ILE vs IVE (y qué unidades atienden qué)

**Marco**
- Lineamientos de 2018: la Secretaría de Salud publicó en la Gaceta Oficial el aviso de actualización de los "Lineamientos generales de organización y operación de los servicios de salud relacionados con la interrupción del embarazo en el Distrito Federal/CDMX". Excélsior ✔ y Chilango ✔ (26-abr-2018) lo ubican en la Gaceta del 25-abr (vigente al día siguiente; la fecha exacta de publicación sale de inferencia, **no leí la Gaceta**, porque `consejeria.cdmx.gob.mx` y la Gaceta no abren) → 🟡.
- Ley de Salud de la CDMX, art. 6 (citado en el folleto del Congreso de la CDMX ✔, "ILE-FINAL-202300509.pdf"): fracción XXIV define ILE y fracción XXV define Interrupción Voluntaria del Embarazo (IVE).

**Diferencias** (Congreso CDMX ✔, Chilango ✔, Excélsior ✔)

| Aspecto | ILE | IVE (violación) | Otras causales (excluyentes de responsabilidad) |
|---|---|---|---|
| Qué es | Procedimiento a solicitud de la mujer embarazada, como parte de atención integral. | Procedimiento a solicitud de la mujer, consecuencia de violación sexual **sin denuncia previa**, conforme a NOM-046-SSA2-2005. | Violación denunciada, inseminación artificial no consentida, riesgo de vida o salud, alteraciones genéticas o congénitas graves. |
| Límite gestacional | 12 semanas completas (12.6 en lineamientos 2018, según Chilango). | Folleto Congreso: "en cualquier momento"; lineamientos 2018: **hasta 20 semanas completas (20.6)** (Excélsior, Chilango). Hay una tensión entre ambas fuentes sin resolver. | Violación denunciada: 20.6; riesgo de vida/salud o alteración congénita: cualquier momento (con criterio médico). |
| Requisitos | Solicitud, consejería, dictamen de salud y de edad gestacional, consentimiento informado. | Los mismos más declaración bajo protesta de decir verdad; no requiere denuncia. | Mismos más autorización de autoridad competente si hay denuncia/inseminación; dos médicos especialistas en caso congénito. |
| Menores | Mayores de 12 años pueden ir con padre, madre o tutor; sin ellos, apoyo de la Procuraduría de Protección de NNA. | Personal médico debe informar a autoridad y Procuraduría. | Igual. |
| Gratuidad | Gratuita (Ley de Salud art. 81, Congreso ✔). | Gratuita. | — |
| Dónde | "15 instalaciones" (folleto Congreso, 2023). | "En las instalaciones de la Secretaría de Salud de la CDMX" (sin lista). | Hospitales. |

**Procedimientos**: medicamento y aspiración manual/eléctrica endouterina (Excélsior ✔). Informe IMSS-Bienestar jul24-jun25 ✔: medicamento 11,568 (90.2 %), aspiración 1,247 (9.7 %), legrado 7 (0.05 %). Distribución por semanas ✔: <4 (1,062), 5 (1,545), 6 (2,626), 7 (2,521), 8 (2,002), 9 (1,351), 10 (820), 11 (560), 12 (335).
Buscador sobre FAQ del portal (🟡, no leída): medicamento para menos de 10 semanas, aspiración de 11 a 12.

**Qué unidades atienden qué**
- ILE hasta 12 semanas: las 14 unidades de la tabla 4.2 (más Ajusco Medio histórico). Solo medicamento (Cuajimalpa, Hermila Galindo, Santa Catarina, Miguel Hidalgo-Tláhuac); medicamento y quirúrgico en el resto, con el quirúrgico suspendido en algunas fichas.
- IVE y causales posteriores a 12 semanas: **sin fuente que lo asigne por unidad** (🔴). Una nota sin verificar indica que después de las 12 semanas las causales como violación "se atienden en unidades hospitalarias" (buscador, 🔴). Por prudencia, Ruta Libre debe presentar "ILE" por unidad y tratar IVE como "consultar/derivación", salvo que se obtenga el listado oficial (solicitud de información a Secretaría de Salud/IMSS-Bienestar CDMX).
- Cualquier servicio de salud pública debe atender violación según NOM-046 (Ley General); el límite de 20.6 semanas es el de los lineamientos locales 2018 (puede haber sido actualizado; Lineamiento Técnico federal 2022 existe, descargado pero no analizado a detalle).

---

## 6. Qué falló al consultar y cómo reintentar

| Recurso | Qué ocurrió (exacto) | Cómo reintentar |
|---|---|---|
| `https://ile.salud.cdmx.gob.mx/` y todas sus rutas HTML (`/estadisticas…`, `/directorio-clinicas-interrupcion-legal-del-embarazo/`, fichas por unidad) | HTTP 200 con cuerpo de 113 bytes: "Parece que tu instalación de PHP no cuenta con la extensión de MySQL, necesaria para hacer funcionar WordPress." Es una falla del servidor (no de red). Mismo resultado vía `r.jina.ai`. | Reintentar más tarde; o pedir a la Secretaría de Salud/IMSS-Bienestar CDMX que lo restaure. |
| `http://ile.salud.cdmx.gob.mx` | `Could not resolve host` (el proxy solo resolvió https). | Usar https. |
| `https://ile.salud.cdmx.gob.mx/wp-content/uploads/*.pdf` | **Sí abre.** Descargados: `ILE-WEB-jun2024.pdf`, `ILE-WEB-mzo2024.pdf`, `ILE-WEB-jul2024-jun2025.pdf`, `WEB_2022_noviembre.pdf`, `WEB_2022_octubre.pdf`, `ILE_WEB_may_2023.pdf`. No existen con esos nombres: `WEB_2022_agosto`, `WEB_2022_septiembre`, `ILE-WEB-jul2024-dic2025` (y 30 variantes probadas). | El PDF "Julio 2024 – Diciembre 2025" está listado en la página de estadísticas según el buscador, pero su nombre de archivo no se conoce. Cuando la página abra, copiar el enlace. Otros nombres vistos: `WEB-2021-2do-trimestre.pdf`, `ILE-WEB.pdf` (corte jun-2020). |
| `www.salud.cdmx.gob.mx`, `salud.cdmx.gob.mx`, `sedesa.cdmx.gob.mx`, `datos.cdmx.gob.mx`, `ckan.datos.cdmx.gob.mx`, `evalua.cdmx.gob.mx`, `semujeres.cdmx.gob.mx`, `jefaturadegobierno.cdmx.gob.mx`, `consejeria.cdmx.gob.mx` | `curl: (35) Recv failure: Connection reset by peer` o `exit 000` (el proxy del entorno cierra el túnel: el estado del proxy muestra `ws_closed_mid_exchange`, y 502 al `CONNECT` para ckan.datos). Probado con y sin `www`, http/https. Esto bloquea los boletines de Sedesa (incluida la nota de sep-2024 con 277,268 y 87,743), el dataset de datos abiertos y la Gaceta. | Reintentar desde otra red/entorno sin ese proxy; o descargar manualmente `https://datos.cdmx.gob.mx/dataset/interrupcion-legal-del-embarazo`. |
| Wayback Machine (`web.archive.org/web/...`, `/cdx/search`, `archive.org/wayback/available`) | Connection reset by peer (`000`) en `web.archive.org`; HTTP 429 en `archive.org/wayback/available`. `archive.ph`: 429. | Reintentar con espera; probar `https://web.archive.org/web/2025*/ile.salud.cdmx.gob.mx*` desde un navegador. |
| Milenio (`milenio.com`, `amp.milenio.com`), La Jornada (`jornada.com.mx`) | HTTP 403 (919 y 5,488 bytes, bloqueo anti-bot). | Abrir en navegador; los datos de Milenio aquí son solo de resúmenes del buscador (🟡 no leídos). |
| GIRE "Aborto en datos" (`gire.org.mx/aborto-en-datos/`, `abortomexico.gire.org.mx/aborto-en-datos/`) | Abre, pero es micrositio descriptivo; la cifra de CDMX remite a la página ILE y GIRE dice que CDMX es la única entidad con seguimiento estadístico. | No aporta tabla propia de CDMX. |
| WebFetch | No usado (indicado como no funcional). | — |

---

## 7. Fuentes (✔ = leída directamente)

**Primarias oficiales**
- ✔ IMSS-Bienestar CDMX, "Productividad del Programa ILE, julio 2024 – junio 2025": https://ile.salud.cdmx.gob.mx/wp-content/uploads/ILE-WEB-jul2024-jun2025.pdf
- ✔ Sedesa/ILE, Estadísticas abril 2007 – 30 jun 2024: https://ile.salud.cdmx.gob.mx/wp-content/uploads/ILE-WEB-jun2024.pdf
- ✔ Estadísticas abril 2007 – 31 mar 2024: https://ile.salud.cdmx.gob.mx/wp-content/uploads/ILE-WEB-mzo2024.pdf
- ✔ Estadísticas abril 2007 – 30 may 2023: https://ile.salud.cdmx.gob.mx/wp-content/uploads/ILE_WEB_may_2023.pdf
- ✔ Estadísticas abril 2007 – 30 nov 2022: https://ile.salud.cdmx.gob.mx/wp-content/uploads/WEB_2022_noviembre.pdf
- ✔ Estadísticas abril 2007 – 31 oct 2022: https://ile.salud.cdmx.gob.mx/wp-content/uploads/WEB_2022_octubre.pdf
- ✔ Congreso de la CDMX, Unidad de Género, "Interrupción Legal del Embarazo" (folleto, 2023; cita Ley de Salud art. 6 y 81): https://genero.congresocdmx.gob.mx/wp-content/uploads/2023/05/ILE-FINAL-202300509.pdf
- ✔ Lineamiento Técnico para la atención del aborto seguro (federal, 2022; descargado, no analizado): https://omm.org.mx/wp-content/uploads/2021/06/LINEAMIENTO_AB_CNEGSR_OPS.pdf

**Organismos autónomos y académicos**
- ✔ CDHCM boletín 33/2025: https://cdhcm.org.mx/wp-content/uploads/2025/04/Bol_ILE.docx.pdf
- ✔ CDHCM boletín 50/2024: https://cdhcm.org.mx/wp-content/uploads/2024/04/Bol-50.pdf
- ✔ CDHCM boletín 45/2022: https://cdhcm.org.mx/wp-content/uploads/2022/04/Bol-45_ILE.docx.pdf
- ✔ CNDH, Informe de la situación del aborto legal, seguro y gratuito en México 2024 (tabla 2, p. 33): https://igualdaddegenero.cndh.org.mx/doc/Seguimiento/Informe_ALSG_2024.pdf
- ✔ GIRE, Aborto en datos: https://abortomexico.gire.org.mx/aborto-en-datos/ y https://gire.org.mx/aborto-en-datos/

**Prensa**
- ✔ La Razón, 28-sep-2026 (19,300; 5,514; 4,170): https://www.razon.com.mx/mexico/2026/09/28/distancia-frena-acceso-a-la-interrupcion-del-embarazo/
- ✔ La Jornada Hidalgo (13,610; 124 de Hidalgo): https://lajornadahidalgo.com/a-cinco-anos-de-la-despenalizacion-del-aborto-en-hidalgo-mujeres-siguen-acudiendo-a-la-cdmx-para-acceder-a-la-ile/
- ✔ El Financiero, 26-abr-2022 (70 %): https://www.elfinanciero.com.mx/cdmx/2022/04/26/aborto-en-cdmx-gobierno-lanzara-programa-de-teleacompanamiento/
- ✔ Expansión, 28-sep-2021 (237,643; 11,269 en 2020): https://politica.expansion.mx/cdmx/2021/09/28/estadisticas-aborto-cdmx-2021
- ✔ Expansión, 20-feb-2021: https://politica.expansion.mx/cdmx/2021/02/20/el-aborto-legal-baja-en-la-cdmx-en-la-pandemia-por-covid-19
- ✔ Expansión, 28-sep-2020 (direcciones de unidades): https://politica.expansion.mx/cdmx/2020/09/28/en-la-pandemia-estos-hospitales-de-la-cdmx-mantienen-activo-el-servicio-de-ile
- ✔ Publimetro, 30-sep-2022 (252,760; 15 unidades): https://www.publimetro.com.mx/noticias/2022/09/30/aborto-gratis-en-cdmx-clinicas-y-requisitos/
- ✔ Publimetro, 28-sep-2022: https://www.publimetro.com.mx/noticias/2022/09/28/aborto-cdmx-14-mil-menores-de-edad-recurren-a-ile/
- ✔ Publimetro, 29-sep-2025: https://www.publimetro.com.mx/nacional/2025/09/29/sin-misoprostol-ni-mifepristona-4-de-cada-10-abortos-son-por-legrado/
- ✔ Chilango, 19-mar-2026 (IMSS; 12,822; 14 hospitales): https://www.chilango.com/noticias/el-imss-garantiza-aborto-voluntario-en-25-estados-asi-cambia-el-mapa-de-atencion-en-cdmx-y-edomex/
- ✔ Chilango, abr-2018 (lineamientos y 194,153): https://www.chilango.com/noticias/interrupcion-del-embarazo/
- ✔ Excélsior, abr-2018 (lineamientos): https://www.excelsior.com.mx/comunidad/interrupcion-del-embarazo-en-cdmx-actualiza-lineamientos/1234769
- ✔ Clínicas de aborto (blog, repite el texto de la Gaceta): https://www.clinicasabortos.mx/blog/aborto/2018/04/26/interrupcion-del-embarazo-en-cdmx-actualiza-lineamiento_3891

**No leídas (solo resumen del buscador, 🟡/🔴)**
- Milenio, Sedesa 277 mil (28-sep-2024): https://www.milenio.com/politica/comunidad/sedesa-277-mil-interrupciones-legales-embarazo (403)
- Milenio, mexiquenses 2020: https://www.milenio.com/politica/comunidad/bajan-28-2-ciento-abortos-mexiquenses-cdmx-2020 (403)
- Milenio, Edomex 69,030 (ago-2022): https://www.milenio.com/politica/comunidad/interrupcion-legal-embarazo-mujeres-edomex-acuden-cdmx (403)
- Sedesa boletín sep-2024: https://www.salud.cdmx.gob.mx/storage/app/uploads/public/66f/84b/b28/66f84bb28f560039675583.pdf (conexión rechazada)
- Sedesa "19 aniversario ILE" (2026): https://salud.cdmx.gob.mx/storage/app/media/2026/19%20aniversario%20ILE.pdf (conexión rechazada)
- Evalúa CDMX, "Aborto legal, seguro y gratuito 2007-2021": https://www.evalua.cdmx.gob.mx/storage/app/media/2022/esteinves/abortolegalseguroygratuitoenlaciudaddemexico20072021.pdf (conexión rechazada)
- Fichas del portal ILE (buscador): https://ile.salud.cdmx.gob.mx/directorio-clinicas-interrupcion-legal-del-embarazo/ y fichas por unidad (error PHP)
- Datos abiertos CDMX: https://datos.cdmx.gob.mx/dataset/interrupcion-legal-del-embarazo (conexión rechazada; fuente del 36 % de CDHCM)

## 8. Pendientes recomendados
1. Obtener el PDF IMSS-Bienestar jul-2024 a dic-2025 para confirmar 19,300 / 13,610 / 4,170 / extranjeras y resolver la alerta de 642 mexiquenses en jul-dic 2025.
2. Descargar el dataset de datos abiertos para obtener el desglose anual por entidad (2007-2024).
3. Identificar el origen de 78,806 o retirarlo.
4. Solicitud de información pública para el listado oficial de unidades que atienden IVE y causales después de 12 semanas, y sus horarios actuales.
5. Agregar `fuente` y `fecha_consulta` a cada registro de `servicios-ile-cdmx.json` y llevar a cabo llamada de verificación por unidad antes del lanzamiento.
