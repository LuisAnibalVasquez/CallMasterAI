# RF-8.08: Evento de Auditoría — user.password_changed

## Información General
- **ID:** RF-8.08
- **Dominio:** DOM-8 — Audit & Compliance
- **Bounded Context:** `Audit`
- **Trazabilidad:** Visión §10.2
- **Dependencias:** RF-1.03 (cambio voluntario), RF-1.06 (cambio forzado), RF-2.02 (primer login)

## Resumen
Registrar evento `user.password_changed` cuando un usuario cambia su contraseña (voluntariamente, por caducidad o en primer login).

## User Story

**DADO QUE** un usuario cambia su contraseña por cualquier motivo (voluntario, caducidad o primer inicio de sesión),
**CUANDO** se completa el cambio exitosamente,
**ENTONCES** registra el evento de auditoría `user.password_changed`.

## Criterios Mínimos de Aceptación

- [ ] Se registra `user.password_changed` en todos los escenarios de cambio de contraseña.
- [ ] El evento incluye los campos obligatorios (RF-8.11).
- [ ] Se registra el motivo del cambio: voluntario, caducidad o primer login.
- [ ] NO se almacena la contraseña anterior ni la nueva (RF-8.12).
- [ ] El evento se registra de forma asíncrona.
