# RF-1.04: Recuperación de Contraseña

## Información General
- **ID:** RF-1.04
- **Dominio:** DOM-1 — Identity & Access
- **Bounded Context:** `Identity`
- **Trazabilidad:** Visión §7.1
- **Dependencias:** RF-7.02 (envío de correo de recuperación)

## Resumen
El sistema debe ofrecer un flujo seguro de **recuperación de contraseña** por correo electrónico para usuarios que no pueden acceder a su cuenta.

## User Story

**DADO QUE** un usuario no puede acceder a su cuenta porque olvidó su contraseña,
**CUANDO** ingresa su dirección de correo electrónico registrada en el formulario de recuperación,
**ENTONCES** el sistema envía un correo con un enlace único y temporal para restablecer la contraseña (independientemente de si el correo existe en el sistema, para evitar enumeración de usuarios).

---

**DADO QUE** un usuario recibe el correo de recuperación y accede al enlace temporal,
**CUANDO** define una nueva contraseña que cumple los requisitos de complejidad y la confirma,
**ENTONCES** el sistema actualiza la contraseña, invalida el enlace de recuperación, cierra todas las sesiones activas y confirma el restablecimiento.

---

**DADO QUE** un usuario intenta usar un enlace de recuperación,
**CUANDO** el enlace ha expirado o ya fue utilizado,
**ENTONCES** el sistema rechaza la operación e indica que debe solicitar un nuevo enlace de recuperación.

## Criterios Mínimos de Aceptación

- [ ] El formulario de recuperación acepta solo la dirección de correo electrónico.
- [ ] El sistema siempre muestra el mismo mensaje de confirmación (independientemente de si el correo existe), para evitar enumeración de usuarios.
- [ ] El enlace de recuperación tiene un tiempo de expiración configurable (ej: 30 minutos).
- [ ] El enlace es de un solo uso: una vez utilizado queda invalidado.
- [ ] La nueva contraseña debe cumplir los mismos requisitos de complejidad que RF-1.03.
- [ ] Tras el restablecimiento, se invalidan todas las sesiones activas del usuario.
- [ ] Se registra el evento de auditoría `user.password_reset_completed` (ver RF-8.09).
- [ ] Se aplica rate limiting al endpoint de solicitud de recuperación para evitar abuso.
