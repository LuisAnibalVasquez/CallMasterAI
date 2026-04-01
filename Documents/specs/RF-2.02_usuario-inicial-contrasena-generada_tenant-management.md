# RF-2.02: Usuario Inicial con Contraseña Generada por el Sistema

## Información General
- **ID:** RF-2.02
- **Dominio:** DOM-2 — Tenant Management
- **Bounded Context:** `TenantManagement`
- **Trazabilidad:** Visión §7
- **Dependencias:** RF-2.01 (crear tenant), RF-1.06 (forzar cambio)

## Resumen
Al crear un tenant, el sistema debe **generar automáticamente** la contraseña del usuario inicial. El usuario debe **cambiar obligatoriamente** esta contraseña en su primer inicio de sesión.

## User Story

**DADO QUE** el Owner crea un nuevo tenant desde el portal administrativo,
**CUANDO** se completa la creación del tenant,
**ENTONCES** el sistema genera automáticamente una contraseña temporal segura para el usuario inicial del tenant, la muestra al Owner una única vez y marca al usuario como "debe cambiar contraseña en próximo login".

---

**DADO QUE** el usuario inicial del tenant inicia sesión por primera vez con la contraseña generada,
**CUANDO** el sistema detecta que el usuario tiene el flag de cambio obligatorio,
**ENTONCES** redirige al usuario a la pantalla de cambio obligatorio de contraseña (RF-1.06) antes de permitir acceso a cualquier funcionalidad.

## Criterios Mínimos de Aceptación

- [ ] La contraseña se genera automáticamente por el sistema (no la define el Owner).
- [ ] La contraseña generada cumple con los requisitos de complejidad del sistema.
- [ ] La contraseña se muestra al Owner una única vez durante la creación (no es recuperable después).
- [ ] El usuario inicial se marca con un flag `must_change_password = true`.
- [ ] En el primer login, el usuario es forzado a cambiar la contraseña antes de acceder al portal (reutiliza flujo de RF-1.06).
- [ ] La contraseña temporal tiene una validez máxima (ej: 72 horas) tras la cual expira si no se usa.
- [ ] Se registra evento de auditoría `user.password_changed` cuando el usuario cambia la contraseña temporal.
