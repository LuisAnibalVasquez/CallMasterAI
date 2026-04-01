# RF-7.02: Correo de Recuperación de Contraseña

## Información General
- **ID:** RF-7.02
- **Dominio:** DOM-7 — Notification
- **Bounded Context:** `Notification`
- **Trazabilidad:** Visión §7.1
- **Dependencias:** RF-1.04 (flujo de recuperación)

## Resumen
El sistema debe enviar correos de **recuperación de contraseña** mediante un flujo seguro cuando un usuario solicita restablecer su contraseña.

## User Story

**DADO QUE** un usuario solicita recuperación de contraseña desde el portal (RF-1.04),
**CUANDO** el sistema procesa la solicitud,
**ENTONCES** envía un correo con un enlace único y temporal al correo registrado del usuario, permitiendo restablecer la contraseña.

---

**DADO QUE** el correo de recuperación es enviado,
**CUANDO** el usuario hace clic en el enlace,
**ENTONCES** accede a una pantalla segura para definir su nueva contraseña.

## Criterios Mínimos de Aceptación

- [ ] El correo contiene un enlace único y temporal para restablecer la contraseña.
- [ ] El enlace tiene una expiración configurable (ej: 30 minutos).
- [ ] El enlace es de un solo uso.
- [ ] El correo se envía independientemente de si el email está registrado (para evitar enumeración de usuarios), pero solo contiene el enlace si el email existe.
- [ ] El correo no revela información sensible de la cuenta.
- [ ] Se implementa política de reintentos en caso de fallo de envío.
- [ ] Se aplica rate limiting para evitar abuso del envío de correos.
