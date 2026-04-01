# RF-1.05: Política de Caducidad de Contraseña Configurable

## Información General
- **ID:** RF-1.05
- **Dominio:** DOM-1 — Identity & Access
- **Bounded Context:** `Identity`
- **Trazabilidad:** Visión §7.1
- **Dependencias:** RF-1.06 (forzar cambio al caducar)

## Resumen
El tenant debe poder configurar la **política de caducidad de contraseña** con opciones predefinidas de 30, 60, 90 o 180 días. Esta política aplica a todos los usuarios del tenant.

## User Story

**DADO QUE** un administrador del tenant accede a la configuración de seguridad en el portal,
**CUANDO** selecciona un período de caducidad de contraseña entre las opciones disponibles (30, 60, 90 o 180 días) y guarda la configuración,
**ENTONCES** el sistema aplica la nueva política a todos los usuarios del tenant, recalculando las fechas de expiración de contraseña a partir de la última vez que cada usuario cambió su contraseña.

---

**DADO QUE** un tenant no ha configurado una política de caducidad,
**CUANDO** se crea el tenant o se consulta la política actual,
**ENTONCES** el sistema aplica un valor por defecto (ej: 90 días).

## Criterios Mínimos de Aceptación

- [ ] Las opciones de caducidad disponibles son exactamente: 30, 60, 90 y 180 días (no valores arbitrarios).
- [ ] Existe un valor por defecto al crear el tenant.
- [ ] El cambio de política se aplica a todos los usuarios del tenant sin excepción.
- [ ] La fecha de expiración se calcula desde el último cambio de contraseña de cada usuario.
- [ ] Se registra el evento de auditoría `tenant.password_policy.updated` (ver RF-8.10).
- [ ] Solo usuarios con permisos administrativos del tenant pueden modificar esta configuración.
