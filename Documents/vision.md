# Documento de Vision del Producto

## Control de Modificaciones
| Fecha | Versión | Autor | Descripción de los Cambios |
| :--- | :--- | :--- | :--- |
| 2026-03-31 | v1.0 | Luis Vasquez | Creación del documento y definición de secciones iniciales. |
| 2026-04-01 | v1.1 | Luis Vasquez | Adición de la tabla de control de versiones para seguimiento. |


Este documento fija la vision y decisiones de producto; incluye detalle cercano a **especificacion** donde ya hay acuerdo (API, datos, infra). Lo **granular** (flujos, reglas de negocio, contratos de API, criterios de aceptacion) se **afina y completa** en los documentos de **requisitos funcionales y no funcionales**.

## 1. Nombre Provisional del Producto
- Call Master AI.

## 2. Vision General
- Producto SaaS multitenant que funcionara como un call center virtual potenciado con IA. Los tenants podran crear campanas de voz para contactar a sus clientes, tanto para fines comerciales como para notificacion de cobranza. **Mercado geografico, idiomas, canal y reglas de ventana de marcacion (zona horaria y feriados)** se definen una sola vez en la **Seccion 9**.
- **Segmentos prioritarios de adopcion:** empresas **BNPL en Venezuela** y **aseguradoras del sector salud en Puerto Rico** (segmentacion y matices en la **Seccion 5**).

## 3. Problema que Queremos Resolver
- Permitir que los tenants realicen llamadas de forma automatizada para reducir costos operativos de call center, aumentar la cobertura de contacto y operar de forma continua con IA.

## 4. Propuesta de Valor
**Que ofrecemos al cliente (beneficios y capacidades diferenciadoras):**
- Automatizar llamadas salientes con un **agente de voz** guiado por guiones, sin operar un call center tradicional.
- **Multitenant** con aislamiento por cliente (tenant), integracion por **API** y uso del **portal** para operacion sin integrar.
- **Resultados** entregados al tenant para procesarlos en sus sistemas (en MVP: correo al cierre de campaña y CSV descargable en la campaña; detalle en seccion 7).
- **Confianza operativa:** ambientes sandbox/produccion, API Keys con alcances, rate limits y minimizacion de datos sensibles tras la entrega (detalle en secciones 9 y 10).

## 5. Usuarios Objetivo y segmentacion de mercado (prioritaria)

**Beachhead (go-to-market inicial):** el producto se orienta en primer lugar a dos segmentos geograficos y sectoriales concretos:

| Segmento | Geografia | Enfoque de uso (tipico) |
|----------|-----------|-------------------------|
| **BNPL** | **Venezuela** | Campañas comerciales (ofertas, recordatorios) y **cobranza** en el alcance del MVP (**solo notificacion**; sin negociacion automatica de acuerdos). |
| **Aseguradoras de salud** | **Puerto Rico** | Comunicacion con asegurados o procesos relacionados al negocio asegurador (recordatorios, notificaciones, segun politicas del tenant). |

**Expansion posterior:** otros paises de LATAM/Caribe y segmentos adicionales **sin compromiso** en esta version del documento; la arquitectura multitenant lo permite.

**Nota:** Puerto Rico es jurisdiccion de EE. UU.; el segmento salud puede implicar requisitos estrictos de datos (p. ej. **HIPAA** si se trata informacion de salud identificable en llamadas o datos cargados). Venezuela implica contexto economico y regulatorio propio para telecomunicaciones, credito y proteccion al consumidor. Detalle legal y de producto en RF y assessment de compliance.

### 5.1 Diferenciacion competitiva (propuesta)
Borrador alineado al MVP; **idiomas y canal** estan en la seccion 9. Elegir 2–3 mensajes principales para material externo.

| Propuesta | Idea |
|---------|------|
| **Datos en casa del cliente** | Tras la campaña, el tenant conserva la informacion sensible; la plataforma minimiza retencion y se centra en agregados y costo. Reduce friccion con compliance y percepcion de riesgo. |
| **Velocidad operativa sin call center propio** | Desde CSV o API: campaña y agente de voz sin contratar platillas ni infra propia; encaje para bajo volumen inicial con arquitectura lista para crecer. |
| **Integracion y prueba disciplinadas** | Ambientes sandbox/produccion, multiples API Keys, alcances full/read_only y rate limits predecibles facilitan integradores y reducen incidentes. |
| **Stack serverless/managed** | Menor carga para equipos con infra limitada; despliegue acorde a Supabase/Railway/Vercel y componentes de voz/IA ya probados. |

## 6. Objetivos del Negocio
**Resultados medibles y de gobierno (sin repetir la propuesta de valor de la seccion 4):**
- Capacidad inicial de al menos **300 llamadas por dia** por tenant/plataforma (segun modelo de despliegue en RF), con **arquitectura escalable** para aumentar volumen.
- Operar un modelo **multitenant** donde el **owner** crea, activa y desactiva tenants y tiene visibilidad de gasto agregado.

## 7. Alcance Inicial (MVP)
- Aplicacion web donde los tenants puedan:
- Cargar clientes via CSV (listado).
- Definir y cargar guiones en documento de texto para guiar la conversacion (archivo de guion separado del CSV).
- Crear campanas de cualquier tipo segun su necesidad.
- En la **aplicacion web**, la campaña **inicia automaticamente** una vez cargados el listado de clientes (CSV) y el guion (cumplidos ambos requisitos).
- Monitorear campanas, efectividad y costo.
- Dashboard tenant (segun usuario logeado): solo ve el resumen de sus campanas y sus gastos/costos.
- **Configuracion de marcacion (tenant):** desde el **dashboard del tenant** podra definir y modificar la **zona horaria**, la **franja horaria** de marcacion (incluida la ventana minima de 8 horas diarias en el reloj local) y la **jurisdiccion/pais** (o fuente) para **dias feriados** aplicables a sus campanas. Los detalles de herencia tenant vs campaña, valores por defecto y validaciones se afinan en RF; la API de integracion debera permitir los mismos parametros donde corresponda.
- **Entrega de resultados al tenant (MVP):**
- Al terminar las llamadas de una campaña, enviar **notificacion por correo electronico** al tenant con la informacion de resultados (el detalle exacto del cuerpo del correo y si incluye datos sensibles se afinara en requisitos funcionales y politica de seguridad).
- En la plataforma, dentro de la campaña, opcion para **descargar un archivo CSV** con cada interaccion (una fila o registro por interaccion).
- API REST para integracion con sistemas del tenant.
- **Integracion por API (MVP):** secuencia explicita de cuatro operaciones REST (**no** auto-inicio al subir archivos): (1) crear la campaña, (2) subir listado de clientes, (3) subir guion, (4) **iniciar** la campaña.
- API protegida con API Key (multiples keys por tenant).
- Separacion de ambientes desde el MVP: sandbox y produccion.
- Agente de IA para realizar llamadas de voz.
- Flujo de ejecucion de llamada:
- Si la llamada es respondida, el agente sigue el guion y conversa con el cliente.
- Se almacena temporalmente el resultado/transcripcion de la interaccion hasta poder entregarla al tenant (correo + CSV descargable segun lo anterior).
- Dashboard owner (administrativo):
- Ver listado de tenants activos/inactivos y su gasto incurrido.
- Crear nuevos tenants y **usuario inicial** con contraseña inicial (acceso al portal: ver seccion 7.1).
- Activar/desactivar tenants.

## 7.1 Autenticacion: portal vs API (MVP)
- **API:** invocacion con **API Key** (multiples keys, ambientes, alcances y rate limits definidos en este documento).
- **Portal web (owner y usuarios de tenant):** usuario y **contraseña**.
- El **owner** crea el tenant y el **usuario inicial** con contraseña inicial asignada por la plataforma (o definida en alta; a precisar en RF).
- El usuario del tenant debe poder **cambiar su contraseña** y usar **recuperacion de contraseña** (flujo seguro por correo u otro canal acordado en RF).
- **Politica de vida de contraseña** configurable **por tenant**: caducidad obligatoria a **30, 60, 90 o 180 dias** segun elija el tenant (al caducar se forzara cambio en siguiente inicio de sesion o equivalente; detalle en RF).

## 8. Fuera de Alcance (por ahora)
- Omnicanalidad (WhatsApp, SMS, email u otros canales distintos a voz).
- Analitica avanzada/predictiva.
- Entrenamiento de modelos propios.

## 9. Supuestos y Restricciones
**Contexto comercial y tecnico base (referencia unica):** lo siguiente concentra mercado, idioma, canal, formato de entrada y **reglas de ventana de marcacion** (zona horaria y feriados); el resto del documento remite aqui cuando aplique.

- **Mercado inicial (segmentacion prioritaria):** empresas **BNPL en Venezuela** y **aseguradoras del sector salud en Puerto Rico** (ver seccion 5). El diseno del MVP debe servir a ambos sin exigir features distintas por pais en la primera version, mas alla de configuracion (zona horaria, feriados, idioma de agente).
- **Alcance geografico del producto (plataforma):** sigue siendo posible dar de alta tenants en otros paises de **LATAM y Caribe** cuando el negocio lo permita; la prioridad comercial y de cumplimiento se concentra en los dos segmentos anteriores.
- Idiomas iniciales: espanol e ingles (relevante especialmente para Puerto Rico y campañas bilingues).
- Canal inicial: solo llamadas de voz.
- Carga inicial de contactos: solo CSV.
- Campos minimos de CSV: nombre y telefono.
- El guion se carga como documento de texto.
- Cobranza en MVP: solo notificacion (sin negociacion automatica de acuerdos de pago).
- **Ventana de operacion de llamadas (marcacion):** el horario de marcacion se define y evalua segun la **zona horaria** y la **franja** que el **tenant configure en su dashboard** (y, si en RF se admite, valores por campaña que hereden o sobrescriban al tenant), de modo que las **8 horas diarias** minimas y los limites legales de llamada se apliquen en el **reloj local correcto**. Por defecto operativo: **lunes a viernes** en esa zona; solo se marcaran llamadas salientes dentro de la franja configurada.
- **Dias feriados:** **no** se realizaran llamadas salientes en **dias feriados** segun el **pais o jurisdiccion** (y fuente de calendario) que el **tenant configure en su dashboard**. Si un feriado cae en dia laboral de la semana, ese dia se trata como **no habil** para marcacion. La actualizacion del calendario feriado (servicio integrado, lista mantenida, etc.) se define en RF.
- **Disponibilidad del servicio (portal y API) vs ventana de llamadas:** no son obligatoriamente lo mismo. La **ventana de 8 h** en MVP se refiere a **cuando el sistema puede marcar**. El **portal y la API** pueden seguir disponibles fuera de esa ventana para consultas, alta de campañas, gestion de credenciales y descargas (mientras la campaña en curso respete la ventana al marcar), salvo que en una fase inicial se decida **restringir todo el sistema** al mismo horario para simplificar operacion y costos. Para el MVP se deja **alineado por defecto** a la misma filosofia operativa (priorizar simplicidad), con flexibilidad de ampliar disponibilidad del portal/API en RF si el negocio lo requiere.
- Se requiere arquitectura preparada para escalar volumen y soportar nuevos canales en fases futuras.
- Restriccion de infraestructura: la plataforma debe desplegarse en servicios serverless/managed para minimizar operacion de infraestructura, priorizando opciones tipo Supabase, Railway y Vercel.
- Las decisiones tecnicas del MVP deben favorecer bajo esfuerzo operativo del equipo (personal de infraestructura limitado).
- Restriccion del agente IA: el agente de voz debe implementarse usando componentes/servicios probados y administrados (por ejemplo, STT/TTS y motor conversacional/agent) para reducir tiempo de desarrollo y riesgos de calidad.
- El agente debe ser diseñado para permitir reemplazo de componentes (telephony, STT/TTS, LLM/agent) con cambios acotados, manteniendo la misma interfaz hacia el tenant.
- Enfasis en tenencia de datos sensibles (minimizacion y retencion): la plataforma conservara datos de clientes, archivos de entrada (CSV y guion) y resultados/transcripciones por interaccion **solo durante la vida util operativa de la campaña y hasta completar la entrega** al tenant (notificacion por correo y/o CSV descargable en la plataforma). **Tras colgar la ultima llamada del ultimo cliente de la campaña**, se **eliminan** de la plataforma el **CSV de clientes** y el **archivo de guion** subidos para esa campaña. Una vez entregados al tenant los resultados segun los mecanismos del MVP, el producto no mantendra informacion sensible de manera **persistente** en base de datos.
- Tras la ejecucion de cada llamada/campaña se conservara unicamente informacion no sensible y agregada para analitica basica y cobro (por ejemplo: numero de campañas creadas/ejecutadas por tenant, clientes por campaña, llamadas hechas y rechazadas, estados de contacto y costo incurrido). No se almacenaran transcripciones completas ni datos sensibles en estado persistente una vez entregados al tenant y aplicada la politica de borrado.
- Gestion de identidad/acceso: la plataforma debe diferenciar acceso y vistas segun rol (owner vs tenant user); el portal usa usuario/contraseña y la integracion API usa API Key (ver seccion 7.1).
- Gestion de credenciales de integracion: cada tenant tendra multiples API Keys, con capacidad de creacion, rotacion y desactivacion.
- Separacion de ambientes: el producto debe soportar al menos sandbox y produccion, con credenciales/keys separadas por ambiente.
- API en MVP: se asume bajo volumen y pocas integraciones; los limites siguientes son conservadores y alineados a serverless/costos previsibles.
- Rate limit por API Key (MVP): sandbox con la mitad de capacidad que produccion.
  - **Produccion:** 30 solicitudes por minuto por key; burst hasta 60 solicitudes en 10 segundos; concurrencia maxima 10 peticiones en vuelo.
  - **Sandbox:** 15 solicitudes por minuto por key; burst hasta 30 en 10 segundos; concurrencia maxima 5 peticiones en vuelo.
  - Exceso de limite: respuesta HTTP 429; documentar reintentos con backoff exponencial. Endpoints pesados (p. ej. carga masiva de CSV) pueden tener limites mas estrictos o cola en fases posteriores.

## 10. API Keys: permisos y auditoria (MVP)

### 10.1 Permisos por key (alcances)
Cada API Key lleva un **alcance** fijo al crearse (no es obligatorio permitir cambiarlo en MVP; si se permite, debe auditarse). Propuesta minima:

| Alcance | Descripcion |
|---------|-------------|
| **full** (por defecto) | Crear y gestionar campanas; subir CSV y guiones; iniciar/detener o programar ejecucion segun lo que exponga la API; consultar estado y resultados entregables; consultar resumenes de uso y costo del tenant en ese ambiente. |
| **read_only** | Solo lectura: listar/detalle de campanas, estados, metricas agregadas y costos; sin crear, modificar, cargar archivos ni disparar llamadas. |

Reglas:
- El **tenant** crea y administra sus keys (self-service); el **owner** puede **revocar** cualquier key de cualquier tenant por incidente o soporte.
- Las keys estan siempre acotadas a **un tenant** y **un ambiente** (sandbox o produccion); no se comparten entre tenants.
- La UI web del tenant puede usar el mismo modelo de permisos para consistencia, o reglas de pantalla equivalentes (fuera del alcance estricto de “API Key” si se prefiere simplificar el MVP).

### 10.2 Eventos de auditoria obligatorios (minimo)
Registrar **quien** (usuario o sistema), **que**, **tenant**, **ambiente** cuando aplique, **timestamp** y **id de recurso** (p. ej. id de key o id de campana). No es necesario guardar secretos ni payloads sensibles.

| Evento | Cuando |
|--------|--------|
| `api_key.created` | Se crea una nueva API Key. |
| `api_key.rotated` | Se sustituye una key por otra (la anterior queda invalida segun reglas de rotacion). |
| `api_key.revoked` | Se desactiva una key (por el tenant o por el owner). |
| `api_key.scope_changed` | Solo si el MVP permite cambiar alcance full/read_only. |
| `tenant.created` | El owner crea un tenant (incluye referencia al usuario inicial si aplica). |
| `tenant.activated` / `tenant.deactivated` | El owner activa o desactiva el tenant. |
| `owner.forced_key_revoke` | El owner revoca una key de un tenant (distinto de una revocacion hecha por el propio tenant). |
| `user.password_changed` | El usuario del tenant (o owner) cambia su contraseña. |
| `user.password_reset_completed` | Finaliza con exito el flujo de recuperacion de contraseña. |
| `tenant.password_policy.updated` | Cambia la politica de caducidad de contraseña del tenant (30/60/90/180 dias). |

Opcional en una fase posterior si suma ruido en MVP: `user.login.success` / `user.login.failure` con politica de retencion corta.

## 11. Riesgos Principales
- Cumplimiento regulatorio por pais (proteccion de datos, consentimiento, horarios de llamada, **zona horaria** y **calendario de feriados** aplicable a cada campaña o contacto).
- **HIPAA y datos de salud:** el segmento **aseguradoras en Puerto Rico** puede involucrar PHI; el segmento **BNPL Venezuela** suele no ser sanitario. El riesgo es aplicar controles y acuerdos (p. ej. BAA con subproveedores) solo donde correspondan y documentar el alcance por tenant y tipo de campaña.
- Calidad de datos de entrada (telefonos invalidos, CSV incompletos o mal formateados).
- Calidad de guiones y experiencia conversacional del agente.
- **Seguridad de integraciones (riesgo residual):** filtracion o mal uso de API Keys u otros secretos a pesar de controles ya definidos (rotacion, rate limits, auditoria, separacion sandbox/produccion). Mitigacion: monitoreo, revocacion rapida, comunicacion al tenant y revision periodica de permisos.
- Dependencia de proveedores serverless/managed (limites, costos variables, lock-in y cambios de pricing).

## 12. Metricas de Exito
- Se mediran inicialmente: volumen de llamadas, tasa de contacto, tasa de respuesta, costo por llamada/campana, efectividad por campana y metricas de cobranza/notificacion.
- Pendiente de definir metas numericas para 3 y 6 meses.

## 13. Proximos Pasos
- Fijar **cifras** publicas (minimos mensuales, minutos incluidos, precio excedente) segun la **Seccion 14** y validar con contabilidad/costos reales de proveedores.
- Definir metas de exito a 3 y 6 meses.
- Confirmar requisitos de cumplimiento por segmento (**Venezuela BNPL** vs **Puerto Rico salud**, incluyendo HIPAA/PHI cuando aplique).
- Afinar contenido del correo de cierre de campaña (resumen vs datos sensibles; posible enlace a descarga en portal).
- Concretar en RF validaciones, valores por defecto, herencia **tenant vs campaña** y contrato API equivalente a la configuracion de marcacion del **dashboard del tenant**.
- Convertir esta vision en requerimientos funcionales detallados del MVP.

## 14. Estructura de costos y modelo de monetizacion (borrador)

Analisis alineado al **target inicial** (BNPL Venezuela y aseguradoras de salud en Puerto Rico), arquitectura **serverless/managed** y producto **voz + IA**. Las cifras de terceros **cambian**; hay que recalcular antes de cotizar.

### 14.1 Buckets de costo (COGS y operacion)

| Bucket | Que incluye | Comportamiento |
|--------|-------------|----------------|
| **Telefonia (variable)** | Minutos salientes, numeros DID, grabacion si se usa en proveedor | Crece linealmente con minutos conectados y destino (fijo vs movil). |
| **IA voz / conversacion (variable)** | STT, TTS, LLM o API tipo Realtime; tokens o minutos de audio | Suele ser el mayor costo marginal si el agente habla mucho; depende del proveedor y del modelo. |
| **Plataforma (semi-fija)** | Base de datos, auth, hosting frontend, funciones, colas, almacenamiento temporal de archivos | Ej.: [Supabase](https://supabase.com/docs/guides/platform/billing-on-supabase) plan Pro mas uso; mas [Vercel](https://vercel.com/pricing) / [Railway](https://railway.app/pricing) segun trafico. |
| **Correo y notificaciones (variable ligera)** | Recuperacion de contraseña, correo de cierre de campaña | Bajo volumen al inicio; escala con tenants y campanas. |
| **Cumplimiento y riesgo (fijo / por tenant)** | Asesoria legal, **BAA** u equivalentes con subproveedores si hay PHI, DPA, seguro cibernetico | Mas relevante en **Puerto Rico / salud**; BNPL Venezuela suele otro perfil de riesgo. |

### 14.2 Orden de magnitud de telefonia (referencia Twilio, pago por uso)

Precios **salientes hacia Venezuela** (lista publica Twilio, en USD por minuto): fijo/urbano aprox. **$0,0600/min**; **movil** aprox. **$0,1265/min**. Fuente: [Programmable Voice Pricing en Venezuela | Twilio](https://www.twilio.com/en-us/voice/pricing/ve).

Para **Puerto Rico**, las tarifas suelen acercarse a precios tipo EE. UU. / destino local (orden de magnitud menor que VE movil en muchos escenarios); la cifra exacta depende del prefijo y direccion de la llamada. Ver [Programmable Voice Pricing en Puerto Rico | Twilio](https://www.twilio.com/en-us/voice/pricing/pr).

**Implicacion para el target:** en **BNPL Venezuela** es probable un alto peso de **movil** => **COGS de telefonia mas alto** que en PR si las llamadas son mayormente locales a fijo/movil con tarifa distinta. Conviene modelar **dos tablas de costo** (destino VE vs PR) al definir margen.

### 14.3 Orden de magnitud de IA de voz

Los productos de conversacion en tiempo real suelen cobrar por **audio y/o tokens**; el costo por minuto de llamada depende de cuanto habla el agente y el usuario. OpenAI documenta consideraciones de coste en [Managing costs (Realtime API)](https://developers.openai.com/api/docs/guides/realtime-costs). En la practica, para presupuestar el MVP conviene medir **USD por minuto conectado** en pruebas con guiones reales (STT+LLM+TTS o pipeline unificado).

### 14.4 Lectura por segmento (monetizacion y riesgo de cobro)

| Segmento | Implicacion comercial |
|----------|------------------------|
| **BNPL Venezuela** | Mayor sensibilidad al precio; COGS telefonia movil alta; **cobro** puede requerir USD, facturacion internacional o **prepago por creditos**. Conveniente un precio claro por **minuto** o por **paquete de minutos** mas una cuota baja de plataforma. |
| **Aseguradoras PR (salud)** | Mayor tolerancia a **cuota mensual minima**, **contrato anual** y cargos por **cumplimiento** (entorno prod, soporte, posibles acuerdos con subproveedores). El coste indirecto de compliance debe reflejarse en el **precio** o en un **add-on**. |

### 14.5 Modelo de monetizacion recomendado (MVP)

**Hibrido**, para cubrir costes fijos de plataforma y COGS variables de voz+IA:

1. **Cuota mensual de plataforma por tenant**  
   Acceso a portal, sandbox + produccion, usuarios incluidos dentro de un limite, soporte basico. Cubre Supabase/hosting/email y parte del soporte.

2. **Minutos (o llamadas) incluidos por mes**  
   Paquete alineado al volumen objetivo (p. ej. capacidad inicial **300 llamadas/dia** en el documento); el volumen en **minutos** se define en RF segun duracion media esperada.

3. **Excedente por minuto conectado** (o por llamada completada, a definir en RF)  
   Precio mayor al **COGS marginal** de ese destino (VE movil vs PR) para no vender por debajo de coste en segmentos caros.

4. **Opcion creditos prepagados** (especialmente util para **Venezuela**)  
   Reduce riesgo de impago y simplifica operacion.

5. **Segmento salud PR**  
   Oferta tipo **Business** con **compromiso minimo mensual** mas alto y checklist de cumplimiento (sin listarlo aqui como precio hasta tener asesoria).

**No recomendado como unico pilar:** solo suscripcion fija sin medir uso (te deja expuesto si un tenant concentra muchos minutos moviles en VE). **No recomendado al inicio:** solo precio por llamada sin minimo mensual (dificil cubrir plataforma y soporte con pocos tenants).

### 14.6 Metrica interna obligatoria

Antes de fijar tarifas publicas: **COGS por minuto** desagregado (**telefonia + IA + almacenamiento temporal**) por **destino** (VE/PR) y por **sandbox vs produccion**. El dashboard del owner ya prevé **gasto incurrido**; la misma base debe alimentar **margen bruto por tenant**.

### 14.7 Fuentes consultadas (enlaces)

- Twilio Voice Venezuela: [twilio.com/en-us/voice/pricing/ve](https://www.twilio.com/en-us/voice/pricing/ve)  
- Twilio Voice Puerto Rico: [twilio.com/en-us/voice/pricing/pr](https://www.twilio.com/en-us/voice/pricing/pr)  
- OpenAI Realtime / costes: [developers.openai.com/api/docs/guides/realtime-costs](https://developers.openai.com/api/docs/guides/realtime-costs)  
- Supabase billing: [supabase.com/docs/guides/platform/billing-on-supabase](https://supabase.com/docs/guides/platform/billing-on-supabase)
