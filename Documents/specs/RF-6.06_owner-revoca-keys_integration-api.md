# RF-6.06: Revocación de API Keys por el Owner

## Información General
- **ID:** RF-6.06
- **Dominio:** DOM-6 — Integration API
- **Bounded Context:** `IntegrationAPI`
- **Trazabilidad:** Visión §10.1
- **Dependencias:** RF-8.07 (auditoría de revocación forzada)

## Resumen
El Owner debe poder **revocar** cualquier API Key de cualquier tenant por incidente o soporte.

## User Story

**DADO QUE** el Owner identifica un incidente de seguridad o recibe una solicitud de soporte,
**CUANDO** accede a la gestión de un tenant específico y revoca una API Key,
**ENTONCES** la key queda invalidada inmediatamente, las solicitudes con esa key se rechazan y se registra el evento como revocación forzada.

## Criterios Mínimos de Aceptación

- [ ] Solo el Owner puede revocar keys de cualquier tenant.
- [ ] La revocación es inmediata e irreversible.
- [ ] Se registra el evento `owner.forced_key_revoke` (RF-8.07), diferenciándolo de una desactivación hecha por el propio tenant.
- [ ] El Owner debe confirmar la acción (diálogo de confirmación).
- [ ] El Owner puede ver el listado de API Keys de cualquier tenant (enmascaradas).
