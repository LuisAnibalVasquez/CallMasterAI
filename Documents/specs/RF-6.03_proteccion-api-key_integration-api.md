# RF-6.03: Protección de API con API Key

## Información General
- **ID:** RF-6.03
- **Dominio:** DOM-6 — Integration API
- **Bounded Context:** `IntegrationAPI`
- **Trazabilidad:** Visión §7
- **Dependencias:** RF-1.02 (autenticación por API Key)

## Resumen
La API debe estar protegida con **API Key** (no usuario/contraseña). Toda solicitud a la API debe incluir una key válida.

## User Story

**DADO QUE** un sistema externo envía una solicitud a cualquier endpoint de la API,
**CUANDO** incluye una API Key válida y activa,
**ENTONCES** la solicitud es procesada según los permisos del alcance de la key.

---

**DADO QUE** una solicitud llega sin API Key o con una key inválida,
**CUANDO** la API evalúa la autenticación,
**ENTONCES** rechaza la solicitud con HTTP 401 sin revelar detalles del motivo del rechazo.

## Criterios Mínimos de Aceptación

- [ ] Todos los endpoints de la API requieren API Key (excepto endpoints de health check si los hay).
- [ ] La API Key se envía en el header de la solicitud.
- [ ] No se acepta usuario/contraseña como mecanismo de autenticación para la API.
- [ ] Keys inválidas, expiradas o revocadas retornan HTTP 401.
- [ ] La respuesta de error no revela si la key existe, está expirada o revocada.
- [ ] La API Key identifica automáticamente: tenant, ambiente y alcance.
