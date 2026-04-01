# RF-8.06: Evento de Auditoría — tenant.activated / tenant.deactivated

## Información General
- **ID:** RF-8.06
- **Dominio:** DOM-8 — Audit & Compliance
- **Bounded Context:** `Audit`
- **Trazabilidad:** Visión §10.2
- **Dependencias:** RF-2.03 (activar/desactivar tenants)

## Resumen
Registrar eventos `tenant.activated` y `tenant.deactivated` cuando el Owner activa o desactiva un tenant.

## User Story

**DADO QUE** el Owner activa o desactiva un tenant,
**CUANDO** se completa el cambio de estado,
**ENTONCES** registra el evento de auditoría correspondiente (`tenant.activated` o `tenant.deactivated`).

## Criterios Mínimos de Aceptación

- [ ] Se registra `tenant.activated` al activar un tenant.
- [ ] Se registra `tenant.deactivated` al desactivar un tenant.
- [ ] Ambos eventos incluyen los campos obligatorios (RF-8.11).
- [ ] Se registra el estado anterior y el nuevo estado del tenant.
- [ ] Los eventos se registran de forma asíncrona.
