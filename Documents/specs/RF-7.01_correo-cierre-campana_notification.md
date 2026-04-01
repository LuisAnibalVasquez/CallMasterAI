# RF-7.01: Correo de Cierre de Campaña

## Información General
- **ID:** RF-7.01
- **Dominio:** DOM-7 — Notification
- **Bounded Context:** `Notification`
- **Trazabilidad:** Visión §7, Decisión de producto
- **Dependencias:** RF-3.07 (descarga CSV), RF-3.10 (almacenamiento temporal)

## Resumen
Al terminar todas las llamadas de una campaña, enviar una **notificación por correo electrónico** al tenant con: (a) un **resumen agregado** de resultados (sin datos sensibles) y (b) un **enlace al portal** donde el tenant puede descargar el CSV completo de resultados.

## User Story

**DADO QUE** una campaña ha completado todas sus llamadas (no quedan contactos pendientes),
**CUANDO** el sistema detecta la finalización de la campaña,
**ENTONCES** envía un correo electrónico al correo de contacto del tenant con: un resumen de métricas agregadas (total llamadas, respondidas, no respondidas, costo) y un enlace directo al portal para descargar el CSV completo de resultados.

---

**DADO QUE** el correo de cierre de campaña es enviado,
**CUANDO** el tenant hace clic en el enlace del portal,
**ENTONCES** accede a la vista de la campaña donde puede descargar el CSV de resultados (RF-3.07).

---

**DADO QUE** el envío del correo falla (error de entrega),
**CUANDO** el sistema detecta el fallo,
**ENTONCES** reintenta el envío según una política de reintentos y, si falla definitivamente, registra el error para seguimiento del equipo de operaciones.

## Criterios Mínimos de Aceptación

- [ ] Se envía un correo al completar la campaña (al finalizar la última llamada).
- [ ] El correo contiene un **resumen agregado**: total de llamadas, respondidas, no respondidas, costo total.
- [ ] El correo **NO contiene datos sensibles**: no incluye nombres, teléfonos ni transcripciones.
- [ ] El correo incluye un **enlace al portal** para descargar el CSV completo (RF-3.07).
- [ ] El enlace al portal requiere autenticación (no es un enlace público sin protección).
- [ ] Se implementa política de reintentos en caso de fallo de envío.
- [ ] El correo se envía al correo de contacto registrado del tenant.
