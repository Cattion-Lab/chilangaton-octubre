# RUTA LIBRE · Privacidad, protección de datos y riesgo de criminalización

Investigación 03 · verificación del 25-oct-2026 · Equipo CATTION, Chilangatón 2026

**Leyenda de confianza:** 🟢 fuente primaria leída directamente · 🟡 fuente secundaria (prensa, resumen de buscador, análisis de terceros) · 🔴 no verificado / de memoria / hallazgo ausente.
En la lista de fuentes, ✔ = abierta y leída directamente en esta sesión.

> Nota de alcance: esto es una investigación documental para el equipo, no asesoría jurídica. Antes de recolectar cualquier dato personal en el piloto, conviene una revisión de una persona abogada (idealmente de una organización como GIRE o R3D).

---

## 1. Resumen

1. **El marco cambió por completo en 2025–2026.** El INAI ya no existe. La Ley General de Transparencia (LGTAIP) y las leyes de datos (LFPDPPP y LGPDPPSO) son nuevas, todas publicadas el 20-mar-2025. La autoridad garante federal es **Transparencia para el Pueblo**, órgano desconcentrado de la **Secretaría Anticorrupción y Buen Gobierno (SABG)**, y la SABG administra la Plataforma Nacional de Transparencia (PNT). 🟢
2. **La CDMX también cambió.** Según la guía oficial del INFO CDMX, el 13-jul-2026 se publicó una nueva ley de transparencia local (LTASI) y una nueva ley de datos local (LPDPPSOCDMX), vigentes desde el 14-jul-2026. El INFO CDMX se extingue y sus funciones pasan a un órgano desconcentrado de la Secretaría de la Contraloría General, **que al momento de la guía aún no estaba creado por decreto**. Durante la transición, los recursos de revisión se pueden presentar pero su trámite está suspendido. 🟢 (guía) / 🟡 (prensa sobre la extinción)
3. **Los datos de salud y de preferencia sexual son «sensibles»** en las leyes federales (estado de salud presente o futuro, preferencia sexual). Exigen consentimiento expreso y por escrito y justificación de la base de datos. Los datos sobre aborto o búsqueda de ILE son, en la práctica, datos de salud. 🟢
4. **El riesgo de criminalización en México es real pero tiene un patrón específico**: según GIRE, las denuncias nacen sobre todo en los servicios de salud (personal que denuncia), no en vigilancia digital. En los 27 casos que GIRE acompañó entre 2012 y 2023, el personal de salud denunció o dio aviso en todos. 🟡/🟢 No encontré en México casos documentados donde datos digitales (ubicación, chats, apps) sean la prueba central; **la ausencia de evidencia no es evidencia de ausencia**. 🔴
5. **Las lecciones post-Dobbs sí documentan datos digitales como evidencia** (caso Nebraska con mensajes de Facebook; geofence/keyword warrants; compra de datos de ubicación a corredores de datos cerca de clínicas). Son de EE. UU., pero muestran qué pasa cuando existen los registros. 🟢/🟡
6. **Evaluación del diseño de Ruta Libre:** la intención es sólida (sin identidad, sin GPS obligatorio, sin historias personales, resultados agregados). Pero el texto actual declara principios y no **controles verificables**. Faltan: definición de quién es «responsable» del tratamiento, qué se registra en logs, retención, umbral mínimo de agregación, protocolo ante requerimientos de autoridad, y consentimiento/acuerdos de uso con las colectivas.
7. **Riesgo propio que el texto no nombra:** las **colectivas y acompañantas** son también titulares de datos (y su actividad puede ser sensible). Además, los resultados «agregados» con pocos casos por alcaldía pueden reidentificar.

---

## 2. Marco legal vigente (México y CDMX, 2026)

### 2.1 Tabla de normas

| Norma | Estado | Qué importa para Ruta Libre | Confianza |
|---|---|---|---|
| **Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)** | Nueva ley, DOF 20-mar-2025; texto vigente con última reforma DOF 14-nov-2025 | Aplica si el responsable del tratamiento es un particular (equipo, asociación, universidad privada, colectiva). Define datos sensibles (definiciones, fr. VI) y exige consentimiento expreso y por escrito (art. 8) | 🟢 |
| **Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (LGPDPPSO)** | Nueva ley, DOF 20-mar-2025; última reforma DOF 14-nov-2025 | Aplica si el tratamiento lo hace una autoridad federal. Mismas reglas de sensibles; art. 7: «por regla general no podrán tratarse datos personales sensibles» salvo consentimiento expreso o el supuesto del art. 16 | 🟢 |
| **Ley General de Transparencia y Acceso a la Información Pública (LGTAIP)** | Nueva ley, DOF 20-mar-2025 | Rige las solicitudes de información federales; crea Transparencia para el Pueblo; la SABG administra la PNT (arts. 44–46) | 🟢 |
| **Ley de Transparencia para el Acceso y Socialización de la Información (LTASI, CDMX)** | Publicada en Gaceta Oficial 13-jul-2026, vigente 14-jul-2026 | Rige solicitudes a sujetos obligados de la CDMX (SEDESA, Secretaría de Movilidad, alcaldías) desde el 14-jul-2026. No pude leer su texto | 🟢 (fecha, vía guía INFO CDMX) / 🔴 (contenido) |
| **Ley de Protección de Datos Personales en Posesión de Sujetos Obligados de la CDMX (LPDPPSOCDMX)** | Publicada en Gaceta Oficial 13-jul-2026, vigente 14-jul-2026 | Rige si el tratamiento lo hace una dependencia o alcaldía de la CDMX (p. ej. si Chilangatón/gobierno aloja la herramienta). No pude leer su texto | 🟢 (fecha) / 🔴 (contenido) |
| **Reglamento de la Ley General de Salud en materia de Investigación para la Salud** | Última reforma DOF 02-abr-2014 | Art. 16: protegerá la privacidad del sujeto, «identificándolo sólo cuando los resultados lo requieran y éste lo autorice». Art. 17 clasifica el riesgo; arts. 20–21 consentimiento informado por escrito. Es discutible que Ruta Libre sea «investigación para la salud»; sirve como estándar de referencia | 🟢 |
| **NOM-004-SSA3-2012 (expediente clínico)** y **Lineamiento Técnico para la Atención del Aborto Seguro** | Vigentes (el Lineamiento aparece fechado 2026 en GIRE) | Confidencialidad del expediente; el personal de salud **no está obligado a denunciar** un aborto sospechado | 🟡 (vía Animal Político/GIRE; no leí el texto oficial) |

**Quién sustituyó al INAI.** La LGTAIP 2025 define como autoridad garante federal a **Transparencia para el Pueblo**, «órgano administrativo desconcentrado de la Secretaría Anticorrupción y Buen Gobierno» (art. 3, fr. III). Las autoridades garantes locales son los «órganos encargados de la contraloría u homólogos en el poder ejecutivo» de cada entidad (fr. IV). 🟢 Esto confirma la nota del propio documento del equipo («autoridad de datos independiente: la actual depende del Ejecutivo»).

### 2.2 Cómo se hace hoy una solicitud de acceso a la información

**Federal (LGTAIP, texto leído):** 🟢
- Cualquier persona puede presentarla por la **Plataforma Nacional de Transparencia (PNT)**, ante la Unidad de Transparencia, por correo electrónico, correo postal, mensajería, telégrafo, verbalmente u otro medio aprobado (art. 124).
- La PNT asigna folio automático (art. 125). La ley limita los requisitos a tres: medio para recibir notificaciones, descripción de la información y modalidad de entrega (art. 126). **No exige identidad ni motivo.**
- La PNT tiene módulos de solicitudes, impugnaciones, portales de obligaciones y comunicación entre autoridades y sujetos obligados (art. 45). La administra la SABG (art. 44).
- Plazo de respuesta: hasta 20 días, ampliable 10 más (leí el texto de la LGTAIP con esas cifras; revisar el artículo exacto antes de citarlo). 🟢/🔴 (número de artículo no verificado)
- Portal: https://www.plataformadetransparencia.org.mx/ (responde, pero la página exige validación de navegador; no pude revisar su contenido).

**CDMX:** las solicitudes presentadas a partir del 14-jul-2026 se fundamentan en la LTASI; las anteriores siguen con la norma previa. La PNT sigue siendo el canal; el INFO CDMX sigue dando soporte (soporte@infocdmx.org.mx) hasta que entre en funciones la nueva autoridad garante. Los **recursos de revisión pueden presentarse pero su tramitación está suspendida** hasta entonces. 🟢 (guía del INFO CDMX)

**Implicación práctica para Ruta Libre:** si el equipo solicita datos agregados de ILE a SEDESA, IMSS-Bienestar, ISSSTE, Secretaría de Movilidad, etc., debe (a) pedir **estadísticas desagregadas, no expedientes**, (b) fundamentar según la ley local si el sujeto obligado es de la CDMX, (c) asumir que **un rechazo no se podrá impugnar con rapidez** en la CDMX durante la transición, y (d) tener plan B (otras fuentes abiertas).

### 2.3 Transparencia: la «columna crítica» sobre causales de reserva

El art. 112 de la LGTAIP 2025 enumera **17 causales** de información reservada, entre ellas: «seguridad pública… o la paz social» (fr. I), «persecución de los delitos» (fr. VII), investigaciones ante el Ministerio Público (fr. XII), «sistemas tecnológicos» del gobierno federal (fr. XVI) y cualquier ley que lo disponga (fr. XVII). 🟢 El plazo de reserva es de 5 años, ampliable 5 más (artículo posterior al 104 en el texto leído; número exacto sin confirmar). 🟢

**Lo que no pude verificar:** si estas causales son realmente *más amplias* que en la ley de 2016. No logré obtener el texto abrogado para compararlo. La inclusión de «paz social» y de «sistemas tecnológicos» es *compatible* con la crítica, pero la afirmación comparativa queda 🔴. Evidencia indirecta de opacidad en el tema: GIRE reporta que **la CDMX dejó de publicar periódicamente sus estadísticas ILE desde junio de 2024** (última actualización disponible: acumulado a julio de 2025, con menor desagregación) y que 33.3 % de las versiones públicas de sentencias de aborto obtenidas por SAI **no estaban testadas** (fallo opuesto: sobre-divulgación de datos personales). 🟢

### 2.4 Datos de salud y sexuales como sensibles

- **LFPDPPP (definiciones, fr. VI)** y **LGPDPPSO art. 3, fr. X: sensibles son los datos que afectan la esfera más íntima o cuya utilización indebida pueda dar origen a discriminación o riesgo grave; enunciativamente: origen racial o étnico, **estado de salud presente o futuro**, información genética, creencias, opiniones políticas y **preferencia sexual**. 🟢
- **Aborto, búsqueda de ILE y embarazo** no se nombran literalmente, pero son «estado de salud presente o futuro». Tratarlos con la regla de sensibles es la lectura prudente. 🟢/🔴 (la inclusión es interpretación mía, no texto)
- **Consentimiento:** expreso y por escrito para sensibles (LFPDPPP art. 8; LGPDPPSO art. 15). La LFPDPPP añade que **no se pueden crear bases con datos sensibles sin justificarlas** con finalidades legítimas, concretas y explícitas (art. 8, 2.º párrafo). 🟢
- **Sanciones:** las multas pueden duplicarse si hay datos sensibles (capítulo de sanciones de la LFPDPPP: hasta dos veces los montos, con multas de hasta 320,000 UMA) y hay tipos penales con pena agravada para sensibles (art. 64 del texto leído). 🟢
- **Dato de anonimización:** si la persona no es identificable, no hay «dato personal» (LFPDPPP, definiciones, fr. V). La carga es demostrar que no es identificable: ver §4.

---

## 3. Riesgos documentados

### 3.1 México: criminalización por aborto

| Hallazgo | Fuente | Confianza |
|---|---|---|
| 2,169 denuncias por aborto ante procuradurías y fiscalías, ene-2012 a dic-2022 (680 contra mujeres, 127 contra hombres, 367 contra «quien resulte responsable», 1,041 sin dato). Nuevo León 742, Baja California 469, Tamaulipas 299 | GIRE, *Maternidad o castigo* (2025), resumen ejecutivo | 🟢 |
| 142 sentencias por aborto en 2012–2022 (99 condenatorias, 15 absolutorias) | Íd. | 🟢 |
| De 2012 a 2023, GIRE atendió 46 casos; acompañó 27; **en ninguno de los 27 se criminalizó al personal de salud**, y «en varios de ellos» el personal del hospital denunció o dio aviso a seguridad pública o fiscalías | Íd. | 🟢 |
| Según Animal Político/GIRE, «en todos» los 27 casos acompañados el personal de salud hizo la denuncia o dio aviso | Animal Político (17-nov-2025) | 🟡 (la cifra «todos» difiere en matiz del resumen ejecutivo: «en varios») |
| 587 carpetas por aborto en fiscalías estatales de ene a ago-2023 | Expansión (resumen de buscador) | 🟡 |
| Corte IDH, *Manuela vs. El Salvador*: la denuncia por la médica violó la vida privada y la salud; el personal debe tener protocolo de confidencialidad | Animal Político | 🟡 |
| El Lineamiento Técnico para el Aborto Seguro indica que el personal de salud no tiene obligación de denunciar; NOM-004 protege el expediente | Animal Político | 🟡 |
| En el sistema legal, la despenalización es por código penal local; las personas de entidades donde sigue penalizado se desplazan a otras (CDMX). Residir en entidad penalizada es un factor de riesgo | GIRE, «Aborto en datos» | 🟢 |

**Inconsistencia a corregir en el proyecto:** GIRE cita la resolución de la SCJN de 6-sep-2023 como **Amparo en Revisión 266/2023** (página «Aborto en datos»); los documentos del equipo citan **AR 267/2023**. Verificar el número en el engrose de la SCJN antes de publicar. 🔴

**Lo que NO encontré (importante):**
- No hallé documentación de GIRE, Artículo 19 o R3D que muestre **datos digitales** (geolocalización, chats, historial de búsqueda, apps) usados como prueba en procesos por aborto en México. Las búsquedas dirigidas a Artículo 19 y R3D con aborto no devolvieron material específico. El único material cercano de R3D es sobre vigilancia estatal en general (*El estado de la vigilancia*, 2016, no leído). 🔴
- La hipótesis del equipo («más rastro digital con el vínculo línea móvil-CURP») es **plausible pero sin evidencia en México**: el propio documento lo declara así. Sobre el estado del registro: una nota dice que la Comisión Reguladora de Telecomunicaciones amplió el plazo hasta el 31-dic-2026 y que ~63 millones de líneas estaban vinculadas al 23-jun-2026; otras notas siguen citando el 30-jun. 🟡 Verificar en DOF/CRT antes de citar.

**Lectura para el diseño:** en México, el vector dominante hoy es **el eslabón humano/institucional** (personal de salud que denuncia, sentencias mal testadas). Para Ruta Libre esto significa que los riesgos más probables son: (i) bases con ubicación + fecha + servicio que alguien pueda cruzar con un expediente, (ii) listas de colectivas/acompañantas, (iii) publicación de resultados con celdas pequeñas.

### 3.2 Lecciones post-Dobbs (EE. UU.)

| Lección | Fuente | Confianza |
|---|---|---|
| **Mensajes privados como prueba:** en Nebraska (2022), la policía obtuvo con orden judicial los mensajes de Facebook de una madre y su hija; mostraban el uso de pastillas, y se usaron en la acusación. Meta dijo que las órdenes «no mencionaban el aborto» y llevaban órdenes de no divulgación. | NPR 12-ago-2022 ✔ | 🟢 |
| **El rastro digital se vuelve evidencia:** «Google Maps puede decirle a la policía si buscaste la dirección de una clínica; los chats si hablaste de aborto; una red de arrastre digital puede dar nombres de quien estuvo cerca de un sitio» | EFF, *Reproductive Justice and Digital Rights: 2022 in Review* ✔ | 🟢 |
| **Geofence y keyword warrants («reverse demands»)**: piden a las empresas los nombres de todos los que estuvieron en un lugar o buscaron un término. EFF patrocina legislación para limitarlos (AB 793). | EFF, *A Year After Dobbs* ✔ | 🟢 |
| **Compra de ubicación a corredores:** Motherboard compró una semana de datos de visitantes a clínicas de Planned Parenthood por USD 160; un corredor siguió ~600 clínicas y compartió datos con campañas antiaborto. SafeGraph y Placer.ai se comprometieron a dejar de vender ese tipo de datos. | STOP (comunicados 2022 y 2024; leí el de 2022 y el de 2024 solo parcialmente) ✔ | 🟡 (cifras vienen de comunicados de STOP; las originales son de Motherboard y el senador Wyden) |
| **Reportes del STOP:** *The Handmaid's Trail* (2022): ya se procesaba a personas con vigilancia electrónica (búsquedas, ubicación, redes). Propone que **las empresas borren datos de ubicación individual y conserven solo agregados**, para no poder cumplir órdenes. | STOP, comunicado 24-may-2022 ✔ | 🟢 (comunicado) |
| **Apps de ciclo:** PI documenta que apps populares guardan y comparten volúmenes grandes de datos (p. ej. notas libres); algunas ya permiten no crear cuenta y separar identidad de datos de ciclo. | Privacy International (resultados de buscador; la página no se pudo abrir: devuelve un aviso de JavaScript) | 🟡 |
| **Consejos de defensa personal:** desactivar ID de publicidad, limitar ubicación, navegador endurecido, Signal, apagar teléfono si se teme rastreo. | EFF, *Security and privacy tips for people seeking an abortion* ✔; Digital Defense Fund (vía CNN/American Prospect, sitio no accesible) | 🟢 EFF / 🟡 DDF |
| **Hallazgo sobre ad-tech:** sitios de información sobre aborto incluyen rastreadores publicitarios. | STOP 2024 (título leído, contenido parcial) | 🟡 |

**Cómo traducir al contexto mexicano:** la ley es distinta (en CDMX el aborto es legal hasta cierto plazo; el riesgo recae en quienes vienen de entidades penalizadas, en menores de edad y en quienes acompañan). Pero la lección técnica es transferible: **lo que se registra, se puede requerir, comprar o filtrar**. La mejor defensa es no tenerlo.

---

## 4. Buenas prácticas de diseño y de investigación

### 4.1 Minimización técnica

| Práctica | Qué significa para Ruta Libre | Respaldo |
|---|---|---|
| **Sin cuentas ni login** | Ninguna identidad persistente | Principio de minimización; PI observa que ya hay apps de ciclo sin cuenta 🟡 |
| **Sin GPS** | Selección manual de alcaldía/colonia/estación; nunca coordenadas exactas | EFF/STOP: la ubicación es el dato más peligroso 🟢 |
| **Cálculo local en el navegador/dispositivo** | Ruta calculada con datos estáticos descargados; el servidor no ve origen ni destino | Práctica estándar de privacidad desde el diseño 🔴 (sin fuente específica leída) |
| **Sin rastreadores ni analítica de terceros; sin IP en logs** | Evitar Google Analytics, píxeles, fuentes/CDN externos que filtren visitas | EFF llamó a organizaciones a retirar rastreadores 🟢 / STOP 2024 🟡 |
| **Hospedaje y logs** | Desactivar logs de acceso o truncar IP; no usar servicios que registren por defecto | Inferencia: el texto original ya dice «incluyendo los registros de los sistemas tecnológicos involucrados» |
| **Agregación mínima (k-anonimato)** | Publicar celdas solo si tienen ≥ k personas (p. ej. k ≥ 10 o más según contexto). Sweeney (2002): cada persona indistinguible de otras k-1. Advierte que **hay ataques de reidentificación incluso en liberaciones k-anónimas** si se ignoran las políticas de despliegue | Sweeney 2002 (resumen de buscador) 🟡; valor de k es decisión del equipo, no norma |
| **Suprimir celdas pequeñas, generalizar territorio** | Pasar de colonia a alcaldía o a zona; agrupar tipos de servicio; fuzzing temporal (mes, no día) | Sweeney 🟡 |
| **Retención mínima** | Datos de talleres: borrado de notas en bruto en X días; solo se conserva la tabla agregada | Principio de limitación del plazo; ver LFPDPPP 🔴 (artículo exacto no extraído) |
| **Datos sintéticos / escenarios ficticios** | Ya previsto: sustituyen historias personales | Coherente con el art. 16 del Reglamento (privacidad del sujeto) 🟢 |

### 4.2 Ética de investigación participativa con colectivas

- **Consentimiento informado por escrito** y revocable; en el Reglamento de la LGS, el consentimiento informado es un acuerdo por escrito (art. 20) y exige condiciones (art. 21). 🟢
- **Acuerdo de uso de datos (data use agreement)** con cada colectiva: quién es responsable, qué se devuelve, qué no se publica, quién puede pedir borrado, qué pasa si hay un requerimiento judicial. Su espíritu: la colectiva decide, no la institución.
- **Devolución de resultados** antes de publicar: revisión por las colectivas (derecho de veto sobre partes que las expongan).
- **Reconocimiento y remuneración** (ya en el documento). 
- **Marcos de «responsabilidad de datos»:** la guía OCHA (revisión enero 2025) aplica incluso a datos **no personales** que podrían usarse para dañar a comunidades; aplicable a datos de trayectos agregados. Fuente: Centre for Humanitarian Data (resultados de buscador, no leí el PDF). 🟡
- **Evitar «reidentificación por contexto»:** cuando la comunidad de colectivas es pequeña, incluso resultados agregados pueden apuntar a una colectiva o a una acompañante.
- **Protocolo ante requerimientos de autoridad** (orden judicial, solicitud de fiscalía): qué datos existen (idealmente ninguno), quién responde, si se avisa a las colectivas. STOP/EFF muestran que las órdenes pueden venir con no divulgación, por lo que la mejor defensa es no tener datos que entregar.
- **Comité de ética / aval institucional** si la investigación se alinea con un estándar de investigación para la salud (decisión del equipo). 🔴

---

## 5. Evaluación del diseño de Ruta Libre

Comparación entre lo que dicen los documentos del equipo y lo que exigiría el marco y las buenas prácticas.

| Elemento del diseño | Estado | Observación |
|---|---|---|
| Sin identidad ni ubicación exacta | ✔ Cumple en intención | Falta definir: ¿hay IP en logs? ¿hospedaje? ¿analítica? |
| Sin GPS obligatorio | ✔ Parcial | La palabra «obligatorio» abre la puerta a GPS opcional. Recomiendo **cero GPS** en el piloto |
| «Evitar almacenar búsquedas y trayectos individuales, incluidos los registros de los sistemas» | ✔ Cumple en intención | Falta un control verificable (auditoría de logs, configuración de servidor) |
| Resultados agregados | ⚠ Parcial | Sin umbral mínimo (k) ni regla de supresión de celdas pequeñas. En un diagnóstico por alcaldía con pocos casos, la agregación sola no basta |
| Escenarios ficticios para no recopilar historias personales | ✔ Cumple | Riesgo residual: en talleres, las personas pueden contar casos reales espontáneamente → protocolo de «no digas, no anotamos» y borrado |
| Indicador: «cumplimiento de los criterios de privacidad y minimización de datos» | ✘ Insuficiente | El indicador no define **criterios medibles**. Hay que convertirlo en una lista de verificación con evidencia |
| Devolución de resultados a colectivas y acompañantas | ✔ Cumple | Falta que la devolución sea **antes** de la difusión y con derecho de veto sobre contenido que las exponga |
| Consentimiento de colectivas y acuerdos de uso | ⚠ Mencionado | «Acuerdos de uso de la información» aparece, sin contenido. Falta consentimiento por escrito para los datos de las propias participantes |
| Identificación del responsable y la ley aplicable | ✘ No aparece | No está dicho si el tratamiento será de un particular (LFPDPPP) o de un sujeto obligado (CDMX/federal). Cambia la autoridad y el aviso de privacidad |
| Solicitudes de información a autoridades | ⚠ Parcial | Se anota la duda sobre el INAI; esta investigación la resuelve (§2.2) |
| Aviso de privacidad | ✘ No aparece | Aunque se minimice, si se recaban datos de participantes de talleres, debe haber un aviso de privacidad simplificado |
| Riesgo por «paz social»/reserva en transparencia | ⚠ Parcial | El diseño debe aceptar que parte de la información puede negarse y tener plan alternativo |

**Veredicto:** el diseño cumple el espíritu de minimización (no recopilar es la mejor protección). Para poder decir que **cumple los criterios de privacidad** como indicador del piloto, faltan definiciones operativas y evidencias. El mayor hueco es doble: (1) qué dato técnico queda en los servidores y (2) la protección de las **colectivas** como titulares y como comunidad.

---

## 6. Recomendaciones de texto para la sección 9

Propuesta de reemplazo y ampliación de la sección «Seguridad y ética para Ruta Libre» (hoy son cuatro viñetas). Texto listo para pegar, ajustable.

> ## 9. Privacidad, seguridad y ética para Ruta Libre
>
> **9.1 Principio rector.** Ruta Libre no necesita saber quién consulta ni desde dónde. Por eso el diseño parte de *no tener* los datos que podrían usarse para identificar, vigilar o criminalizar a una persona, y no de protegerlos después. Los datos que no existen no pueden requerirse, filtrarse ni comprarse.
>
> **9.2 Riesgo reconocido.** En México, la criminalización por aborto se origina sobre todo en denuncias desde servicios de salud (GIRE, 2025). En Estados Unidos, tras *Dobbs*, mensajes privados, ubicación y búsquedas se han usado como evidencia (EFF; STOP). Ruta Libre no documenta casos de uso de datos digitales contra usuarias en México, pero asume el riesgo y diseña para que su herramienta nunca sea una fuente.
>
> **9.3 Controles técnicos (verificables).**
> - Sin cuentas, sin inicio de sesión y sin identificadores persistentes.
> - Sin GPS ni coordenadas exactas: el origen se elige por alcaldía o zona.
> - La ruta se calcula en el dispositivo; el servidor no recibe origen ni destino.
> - Sin analítica ni rastreadores de terceros, sin tipografías ni scripts externos; sin direcciones IP en los registros del servidor.
> - Ningún trayecto, consulta ni búsqueda individual se guarda en un servidor, un archivo o una base de datos.
> - La lista de servicios es información pública verificada (con fuente y fecha); no se registra cuáles se consultan.
>
> **9.4 Datos del proyecto y su tratamiento.** El proyecto solo trata datos personales de las personas participantes en talleres y entrevistas (colectivas, acompañantas, ciudadanía). Esos datos se tratan conforme a [LFPDPPP | ley aplicable según el responsable]: aviso de privacidad, consentimiento expreso y por escrito cuando haya datos sensibles, y derechos ARCO. Los ejercicios usan escenarios ficticios; si alguien narra un caso real, no se anota y se omite del registro. Las notas en bruto se destruyen a más tardar [30] días después del taller; solo se conservan tablas agregadas.
>
> **9.5 Agregación.** Los resultados se publican por [alcaldía/zona], nunca por colonia ni por servicio individual cuando hay menos de [k = 10] observaciones. Las celdas por debajo del umbral se suprimen o se agrupan. Fechas a nivel de mes. Antes de publicar se revisa que el cruce de variables no permita señalar a una persona o colectiva.
>
> **9.6 Colectivas como titulares.** Las colectivas y acompañantas deciden si participan, cómo aparecen (nombre, seudónimo o anónimo) y qué se publica sobre ellas. Cada colectiva firma un *acuerdo de uso* que define finalidad, quién custodia, retención, derecho de retiro y veto previo a la difusión. Los resultados se devuelven a las colectivas **antes** de difundirse.
>
> **9.7 Requerimientos de autoridad.** El equipo no conserva datos individuales. Si recibe un requerimiento, responde que no cuenta con tales datos, informa a las colectivas afectadas cuando la ley lo permita y escala a una organización jurídica aliada.
>
> **9.8 Solicitudes de información.** Las solicitudes a autoridades se presentan por la Plataforma Nacional de Transparencia (federal: Transparencia para el Pueblo, SABG; CDMX: LTASI y, en transición, INFO CDMX). Se piden estadísticas agregadas, nunca expedientes. Las negativas por reserva se documentan.
>
> **9.9 Mensajes y comunicación.** No etiquetar un trayecto como «seguro» sin evidencia. Mostrar fuente y fecha de verificación de cada servicio. Distinguir servicios públicos de ILE de servicios falsos (alerta de 2024).

**Reemplazo del indicador (Fase 4/pilotaje).** En lugar de «Cumplimiento de los criterios de privacidad y minimización de datos», usar:

> *Indicador de privacidad y minimización:* se cumple si, en una auditoría previa al piloto y otra al cierre, se verifica que (1) el servidor no almacena IP, origen, destino ni consultas; (2) no hay GPS ni rastreadores de terceros; (3) ninguna celda publicada tiene menos de k observaciones; (4) existen acuerdos de uso firmados con las colectivas participantes; (5) las notas en bruto se eliminaron en el plazo fijado; (6) las colectivas revisaron los resultados antes de su difusión.

**Pendientes para el equipo:**
1. Definir quién es el «responsable» (persona moral/física o entidad pública) y, por tanto, la ley y la autoridad aplicables (§2.1).
2. Revisar con asesoría jurídica el texto de la LTASI y la LPDPPSOCDMX de la CDMX (no leídos).
3. Confirmar número de la sentencia de la SCJN (266 vs. 267/2023).
4. Verificar con GIRE/R3D si conocen casos mexicanos con evidencia digital.
5. Verificar estado del registro línea-CURP en DOF/CRT.

---

## 7. Fuentes

✔ = abierta y leída directamente en esta sesión. Sin ✔ = tomada de resumen de buscador o no accesible.

### Normas (primarias)
- ✔ Ley Federal de Protección de Datos Personales en Posesión de los Particulares (texto vigente, última reforma DOF 14-11-2025): https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf
- ✔ Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (texto vigente, última reforma DOF 14-11-2025): https://www.diputados.gob.mx/LeyesBiblio/pdf/LGPDPPSO.pdf
- ✔ Ley General de Transparencia y Acceso a la Información Pública (nueva ley DOF 20-03-2025): https://www.diputados.gob.mx/LeyesBiblio/pdf/LGTAIP.pdf
- ✔ Reglamento de la Ley General de Salud en materia de Investigación para la Salud: https://www.diputados.gob.mx/LeyesBiblio/regley/Reg_LGS_MIS.pdf
- ✔ INFO CDMX, *Guía de preguntas frecuentes sobre las nuevas leyes* (LTASI y LPDPPSOCDMX, 13-jul-2026): https://portal.infocdmx.org.mx/sites/default/files/biblioteca-digital/libro/Guia_Preguntas_Frecuentes_Nuevas_Leyes.pdf
- Plataforma Nacional de Transparencia (responde, sin contenido legible): https://www.plataformadetransparencia.org.mx/
- Ley de Protección de Datos CDMX (versión previa, no leída): https://portalddp.infocdmx.org.mx/Resources/documents/LEY_DE_PROTECCION_DE_DATOS_PERSONALES_EN_POSESION_DE_SUJETOS_OBLIGADOS_DE_LA_CIUDAD_DE_MEXICO.pdf

### Transición institucional (secundarias)
- La Razón, aprobación de la nueva ley de transparencia CDMX (1-jun-2026): https://www.razon.com.mx/ciudad/2026/06/01/adios-al-info-cdmx-avala-el-congreso-nuevo-organo/
- IDC Online, extinción del INFO CDMX por reforma constitucional: https://idconline.mx/corporativo/2026/01/09/extincion-del-info-cdmx-por-reforma-constitucional
- Cuatrecasas, nuevas leyes de transparencia y datos (México, 2025): https://www.cuatrecasas.com/es/latam/gobierno-corporativo-compliance/art/nuevas-leyesmateriatransparencia-proteccion-datos-personales
- Zeta Tijuana, extinción formal del INAI: https://zetatijuana.com/2025/03/publican-en-dof-decreto-de-extincion-formal-del-inai-llega-transparencia-para-el-pueblo/
- Estado del registro línea móvil–CURP: https://playersoflife.com/nacional/prorroga-registro-celulares-en-mexico-nueva-fecha-limite-y-calendario-oficial-2026/ (verificar en DOF/CRT)

### Criminalización en México
- ✔ GIRE, *Maternidad o castigo. Hacia la despenalización del aborto en México* (2025), resumen ejecutivo: https://criminalizacionporaborto.gire.org.mx/wp-content/uploads/2025/03/2025_03_05_MATERNIDAD_CASTIGO_RESUMEN-EJECUTIVO.pdf
- Informe completo (no leído): https://gire.org.mx/wp-content/uploads/2025/05/MATERNIDAD_CASTIGO.pdf
- ✔ GIRE, «Aborto en datos» (ILE CDMX, estadísticas y SAI): https://abortomexico.gire.org.mx/aborto-en-datos/
- ✔ Animal Político / Grupo Animal, «Confidencialidad y criminalización por aborto» (17-nov-2025): https://grupoanimal.mx/opinion/confidencialidad-y-criminalizacion-por-aborto
- Milenio, «Persiguen más a mujeres por aborto que a feminicidas»: https://www.milenio.com/estados/mexico-persiguen-mas-a-mujeres-por-aborto-que-a-feminicidas
- R3D, *El estado de la vigilancia* (2016, no leído): https://r3d.mx/wp-content/uploads/R3D-edovigilancia2016.pdf

### Lecciones post-Dobbs
- ✔ NPR, «Nebraska cops used Facebook messages to investigate an alleged illegal abortion» (12-ago-2022): https://www.npr.org/2022/08/12/1117092169/nebraska-cops-used-facebook-messages-to-investigate-an-alleged-illegal-abortion
- ✔ EFF, «Reproductive Justice and Digital Rights: 2022 in Review»: https://www.eff.org/deeplinks/2022/12/reproductive-justice-and-digital-rights-year-review
- ✔ EFF, «A Year After Dobbs, the Fight for Reproductive Privacy and Information Access Continues»: https://www.eff.org/deeplinks/2023/06/year-dobbs-fight-reproductive-privacy-and-information-access-continues
- ✔ EFF, «Security and privacy tips for people seeking an abortion»: https://www.eff.org/deeplinks/2022/06/security-and-privacy-tips-people-seeking-abortion
- ✔ S.T.O.P., «Releases Report On Abortion Surveillance After Roe» (24-may-2022): https://www.stopspying.org/latest-news/2022/5/24/stop-releases-report-on-abortion-surveillance-after-roe
- S.T.O.P., ad-tech y sitios de aborto (21-feb-2024; leído parcialmente): https://www.stopspying.org/latest-news/2024/2/21/stop-documents-ubiquitous-ad-tech-surveillance-of-abortion-websites
- Privacy International, «All Eyes on my Period?» (no abrió: exige JavaScript): https://privacyinternational.org/long-read/5593/all-eyes-my-period-period-tracking-apps-and-future-privacy-post-roe-world
- Digital Defense Fund (sitio sin contenido legible; contenido tomado de cobertura CNN/American Prospect): https://digitaldefensefund.org/ · https://prospect.org/2022/07/01/abortion-seekers-must-protect-themselves-and-their-data/

### Buenas prácticas
- Sweeney, L. (2002). *k-anonymity: a model for protecting privacy*. IJUFKS 10(5):557-570 (solo resumen): https://dataprivacylab.org/projects/kanonymity/
- OCHA, *Data Responsibility Guidelines* (rev. enero 2025; resumen): https://centre.humdata.org/the-ocha-data-responsibility-guidelines/

### Brechas conocidas
- No leí el texto de la LTASI ni de la LPDPPSOCDMX 2026 (sólo la guía oficial del INFO CDMX).
- No pude comparar el art. 112 LGTAIP 2025 con el texto de 2016 (descarga 404); la afirmación de «causales ampliadas» queda sin verificar.
- No hallé casos mexicanos con evidencia digital; Artículo 19 y R3D no aportaron material específico sobre aborto.
- Privacy International y Digital Defense Fund: los sitios no entregaron contenido legible desde este entorno.
