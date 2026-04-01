# RF-8.09: Evento de Auditoría — user.password_reset_completed

## Información General
- **ID:** RF-8.09
- **Dominio:** DOM-8 — Audit & Compliance
- **Bounded Context:** `Audit`
- **Trazabilidad:** Visión §10.2
- **Dependencias:** RF-1.04 (recuperación de contraseña)

## Resumen
Registrar evento `user.password_reset_completed` cuando finaliza con éxito el flujo de recuperación de contraseña.

## User Story

**DADO QUE** un usuario completa exitosamente el flujo de recuperación de contraseña (RF-1.04),
**CUANDO** la nueva contraseña es establecida mediante el enlace de recuperación,
**ENTONCES** registra el evento de auditoría `user.password_reset_completed`.

## Criterios Mínimos de Aceptación

- [ ] Se registra `user.password_reset_completed` al completar el restablecimiento exitoso.
- [ ] El evento incluye los campos obligatorios (RF-8.11).
- [ ] Se diferencia del evento `user.password_changed` (este es por recuperación, no por cambio voluntario).
- [ ] NO se almacena la contraseña (RF-8.12).
- [ ] Se registra el método de recuperación utilizado (correo electrónico).
