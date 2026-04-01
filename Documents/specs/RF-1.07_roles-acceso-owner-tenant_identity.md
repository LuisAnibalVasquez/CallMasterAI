# RF-1.07: Diferenciación de Roles de Acceso (Owner vs Tenant)

## Información General
- **ID:** RF-1.07
- **Dominio:** DOM-1 — Identity & Access
- **Bounded Context:** `Identity`
- **Trazabilidad:** Visión §9
- **Dependencias:** RF-1.08 (segregación de vistas por rol)

## Resumen
El sistema debe diferenciar **roles de acceso**: Owner (administrador de plataforma) y Usuario de Tenant. Cada rol tiene permisos y vistas distintas dentro del portal.

## User Story

**DADO QUE** un usuario se autentica exitosamente en el portal web,
**CUANDO** el sistema valida sus credenciales y determina su rol,
**ENTONCES** asigna los permisos correspondientes al rol (Owner o Tenant) y permite el acceso únicamente a las funcionalidades y datos autorizados para ese rol.

---

**DADO QUE** un usuario con rol de Tenant intenta acceder a una funcionalidad exclusiva del Owner (ej: gestión de tenants),
**CUANDO** el sistema evalúa los permisos del usuario,
**ENTONCES** deniega el acceso y muestra un mensaje de permisos insuficientes o redirige al dashboard del tenant.

## Criterios Mínimos de Aceptación

- [ ] Existen al menos dos roles: `Owner` (administrador de plataforma) y `TenantUser` (usuario de tenant).
- [ ] Los permisos están definidos por rol, no por usuario individual (en el MVP).
- [ ] El rol se asigna al crear el usuario y es inmutable desde el portal del tenant.
- [ ] Intentar acceder a recursos fuera del rol asignado retorna HTTP 403 (Forbidden) en API o redirección en portal.
- [ ] El rol del usuario se incluye en el token de sesión/JWT para evaluación en cada solicitud.
- [ ] Las funcionalidades del Owner incluyen: gestión de tenants, dashboard administrativo global, revocación de API Keys de cualquier tenant.
- [ ] Las funcionalidades del Tenant incluyen: gestión de campañas, dashboard propio, configuración de seguridad y marcación, gestión de API Keys propias.
