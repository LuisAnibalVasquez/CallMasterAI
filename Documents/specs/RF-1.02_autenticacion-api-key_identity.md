# RF-1.02: Autenticación de API mediante API Key

## Información General
- **ID:** RF-1.02
- **Dominio:** DOM-1 — Identity & Access
- **Bounded Context:** `Identity`
- **Trazabilidad:** Visión §7.1

## Resumen
El sistema debe autenticar llamadas a la API REST mediante **API Key** (sin usuario/contraseña). Cada API Key identifica al tenant, el ambiente (sandbox/producción) y el alcance de permisos.

## User Story

**DADO QUE** un sistema externo del tenant envía una solicitud a la API REST,
**CUANDO** incluye una API Key válida y activa en el header de autorización,
**ENTONCES** el sistema autentica la solicitud, identifica al tenant y ambiente correspondientes, y permite el acceso según el alcance (scope) de la key.

---

**DADO QUE** un sistema externo envía una solicitud a la API REST,
**CUANDO** la API Key es inválida, expirada o revocada,
**ENTONCES** el sistema rechaza la solicitud con HTTP 401 (Unauthorized) sin revelar detalles sobre el motivo específico del rechazo.

---

**DADO QUE** un sistema externo envía una solicitud sin API Key,
**CUANDO** el sistema recibe la petición,
**ENTONCES** rechaza la solicitud con HTTP 401 (Unauthorized).

## Criterios Mínimos de Aceptación

- [ ] La API Key se envía en un header estándar (ej: `X-API-Key` o `Authorization: Bearer`).
- [ ] El sistema valida existencia, estado activo y ambiente de la key en cada solicitud.
- [ ] Las API Keys se almacenan hasheadas en base de datos (no en texto plano).
- [ ] Solicitudes sin key o con key inválida retornan HTTP 401.
- [ ] La respuesta de error no revela información sobre la existencia o estado de la key.
- [ ] El tenant y ambiente se resuelven automáticamente a partir de la key autenticada.
