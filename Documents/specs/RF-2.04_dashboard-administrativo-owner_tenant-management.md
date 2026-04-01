# RF-2.04: Dashboard Administrativo del Owner

## Información General
- **ID:** RF-2.04
- **Dominio:** DOM-2 — Tenant Management
- **Bounded Context:** `TenantManagement`
- **Trazabilidad:** Visión §7

## Resumen
El Owner debe tener un **Dashboard administrativo** con listado de tenants activos/inactivos y su **gasto incurrido**. Es la vista principal de gestión de la plataforma.

## User Story

**DADO QUE** el Owner inicia sesión en el portal web,
**CUANDO** accede al dashboard principal,
**ENTONCES** el sistema muestra un listado de todos los tenants registrados con su estado (activo/inactivo), gasto incurrido acumulado e indicadores consolidados de uso de la plataforma.

---

**DADO QUE** el Owner está en el dashboard administrativo,
**CUANDO** filtra por estado (activo/inactivo) o busca por nombre de tenant,
**ENTONCES** el sistema actualiza el listado mostrando solo los tenants que coinciden con los criterios de búsqueda.

---

**DADO QUE** el Owner selecciona un tenant específico del listado,
**CUANDO** accede al detalle del tenant,
**ENTONCES** puede ver información resumida: datos del tenant, gasto desglosado, estado, fecha de creación y acciones disponibles (activar/desactivar).

## Criterios Mínimos de Aceptación

- [ ] El dashboard muestra la lista completa de tenants con: nombre, estado (activo/inactivo), gasto incurrido.
- [ ] El gasto incurrido se muestra en USD (o moneda de facturación definida).
- [ ] Se permite filtrar por estado (activo/inactivo).
- [ ] Se permite buscar tenants por nombre.
- [ ] El dashboard muestra indicadores consolidados: total de tenants activos, gasto total de la plataforma.
- [ ] Acceso exclusivo para usuarios con rol Owner.
- [ ] Los datos se actualizan al recargar la página (no se requiere tiempo real en MVP).
