# RF-1.03: Cambio de Contraseña del Usuario

## Información General
- **ID:** RF-1.03
- **Dominio:** DOM-1 — Identity & Access
- **Bounded Context:** `Identity`
- **Trazabilidad:** Visión §7.1

## Resumen
El usuario del tenant debe poder **cambiar su contraseña** desde el portal web. La operación requiere conocer la contraseña actual como medida de seguridad.

## User Story

**DADO QUE** un usuario autenticado accede a la sección de configuración de su cuenta en el portal,
**CUANDO** ingresa su contraseña actual, define una nueva contraseña que cumple con los requisitos de complejidad y confirma la nueva contraseña,
**ENTONCES** el sistema valida la contraseña actual, actualiza la contraseña almacenada, invalida las sesiones anteriores y confirma el cambio al usuario.

---

**DADO QUE** un usuario autenticado intenta cambiar su contraseña,
**CUANDO** ingresa una contraseña actual incorrecta,
**ENTONCES** el sistema rechaza la operación y muestra un mensaje de error indicando que la contraseña actual es incorrecta.

---

**DADO QUE** un usuario autenticado intenta cambiar su contraseña,
**CUANDO** la nueva contraseña no cumple con los requisitos mínimos de complejidad,
**ENTONCES** el sistema rechaza la operación e indica qué requisitos no se cumplen.

## Criterios Mínimos de Aceptación

- [ ] El usuario debe ingresar la contraseña actual como verificación de identidad.
- [ ] La nueva contraseña debe cumplir requisitos mínimos de complejidad (longitud, caracteres especiales, etc.).
- [ ] El campo de nueva contraseña requiere confirmación (doble entrada).
- [ ] Tras el cambio exitoso, se invalidan todas las sesiones previas del usuario.
- [ ] Se registra el evento de auditoría `user.password_changed` (ver RF-8.08).
- [ ] La nueva contraseña no puede ser igual a la anterior.
