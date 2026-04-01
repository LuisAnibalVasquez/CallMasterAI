# RF-1.06: Forzar Cambio de Contraseña Caducada

## Información General
- **ID:** RF-1.06
- **Dominio:** DOM-1 — Identity & Access
- **Bounded Context:** `Identity`
- **Trazabilidad:** Visión §7.1
- **Dependencias:** RF-1.05 (política de caducidad), RF-1.03 (cambio de contraseña)

## Resumen
Al caducar la contraseña según la política del tenant (RF-1.05), el sistema debe **forzar el cambio** en el siguiente inicio de sesión. El usuario no puede acceder a ninguna funcionalidad del portal hasta completar el cambio.

## User Story

**DADO QUE** la contraseña de un usuario ha excedido el período de caducidad configurado por el tenant,
**CUANDO** el usuario intenta iniciar sesión con sus credenciales actuales (válidas pero caducadas),
**ENTONCES** el sistema autentica las credenciales pero redirige al usuario a una pantalla de cambio obligatorio de contraseña, bloqueando el acceso a cualquier otra sección del portal hasta que complete el cambio.

---

**DADO QUE** un usuario está en la pantalla de cambio obligatorio de contraseña,
**CUANDO** ingresa su contraseña actual, define una nueva contraseña válida y la confirma,
**ENTONCES** el sistema actualiza la contraseña, renueva la fecha de expiración según la política vigente y redirige al usuario al dashboard correspondiente.

## Criterios Mínimos de Aceptación

- [ ] El usuario con contraseña caducada es autenticado pero no puede navegar a ninguna sección excepto el cambio de contraseña.
- [ ] La pantalla de cambio obligatorio es distinta al cambio voluntario (RF-1.03), con mensaje explícito de que la contraseña ha caducado.
- [ ] La nueva contraseña debe cumplir los requisitos de complejidad y no puede ser igual a la anterior.
- [ ] Tras el cambio exitoso, la nueva fecha de expiración se calcula a partir de la fecha actual según la política vigente del tenant.
- [ ] Se registra el evento de auditoría `user.password_changed` (ver RF-8.08).
- [ ] Si el usuario no cambia la contraseña y cierra la sesión, al volver a iniciar sesión se le vuelve a exigir el cambio.
