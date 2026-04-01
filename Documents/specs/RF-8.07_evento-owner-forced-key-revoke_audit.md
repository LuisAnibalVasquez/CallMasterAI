# RF-8.07: Evento de Auditoría — owner.forced_key_revoke

## Información General
- **ID:** RF-8.07
- **Dominio:** DOM-8 — Audit & Compliance
- **Bounded Context:** `Audit`
- **Trazabilidad:** Visión §10.2
- **Dependencias:** RF-6.06 (Owner revoca keys)

## Resumen
Registrar evento `owner.forced_key_revoke` cuando el Owner revoca una API Key de un tenant, distinguiéndolo de una desactivación hecha por el propio tenant.

## User Story

**DADO QUE** el Owner revoca una API Key de un tenant por incidente o soporte,
**CUANDO** la key queda invalidada,
**ENTONCES** registra el evento `owner.forced_key_revoke` que se diferencia explícitamente del evento `api_key.revoked` generado por una desactivación del propio tenant.

## Criterios Mínimos de Aceptación

- [ ] Se registra `owner.forced_key_revoke` (no `api_key.revoked`) cuando la revocación es hecha por el Owner.
- [ ] El evento incluye los campos obligatorios (RF-8.11).
- [ ] Se identifica claramente que el actor fue el Owner (no el tenant).
- [ ] Se registra el tenant afectado y el ID de la key revocada.
- [ ] NO se almacena el valor de la key (RF-8.12).
