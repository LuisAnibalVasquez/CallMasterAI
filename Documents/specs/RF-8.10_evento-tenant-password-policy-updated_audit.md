# RF-8.10: Evento de Auditoría — tenant.password_policy.updated

## Información General
- **ID:** RF-8.10
- **Dominio:** DOM-8 — Audit & Compliance
- **Bounded Context:** `Audit`
- **Trazabilidad:** Visión §10.2
- **Dependencias:** RF-1.05 (política de caducidad)

## Resumen
Registrar evento `tenant.password_policy.updated` cuando cambia la política de caducidad de contraseña del tenant.

## User Story

**DADO QUE** un administrador del tenant cambia la política de caducidad de contraseña (RF-1.05),
**CUANDO** se guarda la nueva configuración (30, 60, 90 o 180 días),
**ENTONCES** registra el evento de auditoría `tenant.password_policy.updated`.

## Criterios Mínimos de Aceptación

- [ ] Se registra `tenant.password_policy.updated` al cambiar la política.
- [ ] El evento incluye los campos obligatorios (RF-8.11).
- [ ] Se registra el valor anterior y el nuevo valor de la política.
- [ ] El evento se registra de forma asíncrona.
