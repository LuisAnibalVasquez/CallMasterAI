# RF-3.11: Validación de API Key Activa para Campañas

## Información General
- **ID:** RF-3.11
- **Dominio:** DOM-3 — Campaign Management
- **Bounded Context:** `CampaignManagement`
- **Trazabilidad:** Decisión de producto (2026-04-01)
- **Dependencias:** RF-6.04 (múltiples API Keys), RF-8.13 (auditoría)

## Resumen
Al intentar **crear o iniciar una campaña**, el sistema debe validar que el tenant tenga al menos una **API Key activa** en el ambiente correspondiente. Si no existe ninguna API Key activa, el sistema debe **rechazar la operación**. Esta validación aplica tanto para el portal como para la API.

## User Story

**DADO QUE** un usuario del tenant intenta crear o iniciar una campaña desde el portal o la API,
**CUANDO** el sistema ejecuta las validaciones de precondición,
**ENTONCES** verifica que exista al menos una API Key activa asociada al tenant en el ambiente actual (sandbox o producción); si existe, permite continuar; si no existe, rechaza la operación.

---

**DADO QUE** no existe ninguna API Key activa para el tenant en el ambiente actual,
**CUANDO** el usuario intenta crear o iniciar una campaña,
**ENTONCES** el sistema rechaza la operación con un mensaje claro indicando que se requiere al menos una API Key activa, registra el evento de auditoría `campaign.blocked_no_active_key` (RF-8.13) y sugiere al usuario que gestione sus API Keys.

---

**DADO QUE** un tenant tiene API Keys pero todas están revocadas o desactivadas,
**CUANDO** intenta crear o iniciar una campaña,
**ENTONCES** el sistema trata esta situación como si no tuviera API Keys (rechaza la operación).

## Criterios Mínimos de Aceptación

- [ ] La validación se ejecuta tanto al **crear** como al **iniciar** una campaña.
- [ ] La validación aplica tanto en el **portal web** como en la **API REST**.
- [ ] Se verifica la existencia de al menos una API Key con estado `activa` en el ambiente actual del tenant.
- [ ] API Keys revocadas, expiradas o desactivadas no cuentan como "activas".
- [ ] El mensaje de error es claro y orienta al usuario a gestionar sus API Keys.
- [ ] Se registra el evento de auditoría `campaign.blocked_no_active_key` (RF-8.13).
- [ ] La validación comparte la misma lógica entre portal y API (código unificado).
- [ ] En la API, el rechazo retorna HTTP 409 (Conflict) o HTTP 422 (Unprocessable Entity) con detalle del motivo.
