# RF-1.08: Segregación de Vistas y Funcionalidades por Rol

## Información General
- **ID:** RF-1.08
- **Dominio:** DOM-1 — Identity & Access
- **Bounded Context:** `Identity`
- **Trazabilidad:** Visión §7, §9
- **Dependencias:** RF-1.07 (roles de acceso)

## Resumen
Las vistas y funcionalidades del portal deben estar **segregadas por rol**: el Owner ve la gestión global de plataforma y el Tenant ve solo sus campañas y datos propios. Un rol nunca debe ver información ni acceder a funcionalidades del otro.

## User Story

**DADO QUE** un usuario con rol Owner inicia sesión en el portal,
**CUANDO** el sistema carga el dashboard principal,
**ENTONCES** muestra únicamente las vistas del Owner: listado de tenants, gasto consolidado, gestión global; sin mostrar funcionalidades de gestión de campañas individuales.

---

**DADO QUE** un usuario con rol Tenant inicia sesión en el portal,
**CUANDO** el sistema carga el dashboard principal,
**ENTONCES** muestra únicamente las vistas del tenant: sus campañas, su gasto, su configuración; sin mostrar información de otros tenants ni de la administración de plataforma.

---

**DADO QUE** un usuario con rol Tenant intenta navegar manualmente a una URL del panel Owner,
**CUANDO** el sistema evalúa la autorización,
**ENTONCES** deniega el acceso y redirige al dashboard del tenant.

## Criterios Mínimos de Aceptación

- [ ] La navegación (menú, sidebar) se renderiza dinámicamente según el rol del usuario autenticado.
- [ ] Las rutas del portal están protegidas por rol tanto en frontend (ocultamiento de UI) como en backend (validación de permisos en cada endpoint).
- [ ] Un usuario Owner no tiene acceso a funcionalidades de operación de campañas (es un administrador de plataforma, no un operador de campañas).
- [ ] Un usuario Tenant nunca ve datos de otros tenants.
- [ ] La segregación se verifica tanto por navegación normal como por manipulación directa de URL.
- [ ] Las respuestas de API para usuarios no autorizados no filtran información del recurso (ej: retornar 403 sin body informativo).
