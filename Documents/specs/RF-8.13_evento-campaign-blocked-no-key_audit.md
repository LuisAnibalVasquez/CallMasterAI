# RF-8.13: Evento de Auditoría — campaign.blocked_no_active_key

## Información General
- **ID:** RF-8.13
- **Dominio:** DOM-8 — Audit & Compliance
- **Bounded Context:** `Audit`
- **Trazabilidad:** Decisión de producto (2026-04-01)
- **Dependencias:** RF-3.11 (validación de API Key activa)

## Resumen
Registrar evento `campaign.blocked_no_active_key` cuando se rechaza la creación o inicio de una campaña por falta de API Key activa.

## User Story

**DADO QUE** un usuario intenta crear o iniciar una campaña sin tener API Key activa (RF-3.11),
**CUANDO** el sistema rechaza la operación,
**ENTONCES** registra el evento de auditoría `campaign.blocked_no_active_key` con detalle del tenant, ambiente, usuario que intentó la operación y la operación rechazada (creación o inicio).

## Criterios Mínimos de Aceptación

- [ ] Se registra `campaign.blocked_no_active_key` cada vez que se rechaza una operación por esta validación.
- [ ] El evento incluye los campos obligatorios (RF-8.11).
- [ ] Se registra la operación intentada: creación de campaña o inicio de campaña.
- [ ] Se registra si el intento fue desde el portal o desde la API.
- [ ] El evento sirve como indicador operativo para detectar tenants con problemas de configuración.
- [ ] El evento se registra de forma asíncrona.
