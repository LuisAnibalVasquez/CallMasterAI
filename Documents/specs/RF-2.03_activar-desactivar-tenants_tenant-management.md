# RF-2.03: Activación y Desactivación de Tenants

## Información General
- **ID:** RF-2.03
- **Dominio:** DOM-2 — Tenant Management
- **Bounded Context:** `TenantManagement`
- **Trazabilidad:** Visión §7
- **Dependencias:** RF-8.06 (auditoría)

## Resumen
El Owner debe poder **activar y desactivar** tenants. Un tenant desactivado no puede ejecutar campañas, acceder al portal ni consumir la API.

## User Story

**DADO QUE** el Owner visualiza el listado de tenants en el dashboard administrativo,
**CUANDO** selecciona un tenant activo y ejecuta la acción de desactivar,
**ENTONCES** el sistema cambia el estado del tenant a "inactivo", impide nuevos inicios de sesión de sus usuarios, detiene campañas en curso (si las hay), invalida las sesiones activas y confirma la desactivación al Owner.

---

**DADO QUE** el Owner visualiza un tenant con estado inactivo,
**CUANDO** ejecuta la acción de activar,
**ENTONCES** el sistema cambia el estado a "activo", permitiendo nuevamente el acceso y las operaciones del tenant.

---

**DADO QUE** un usuario de un tenant desactivado intenta iniciar sesión o consumir la API,
**CUANDO** el sistema valida el estado del tenant,
**ENTONCES** rechaza la solicitud con un mensaje indicando que la cuenta está suspendida.

## Criterios Mínimos de Aceptación

- [ ] Solo el Owner puede activar/desactivar tenants.
- [ ] La desactivación impide: login al portal, consumo de API, ejecución de campañas.
- [ ] Al desactivar, se invalidan todas las sesiones activas de los usuarios del tenant.
- [ ] Al desactivar, las campañas en curso se detienen de forma controlada (no se pierden datos de interacciones ya realizadas).
- [ ] La activación restaura el acceso sin pérdida de datos ni configuración.
- [ ] Se registran eventos de auditoría `tenant.activated` / `tenant.deactivated` (ver RF-8.06).
- [ ] El Owner debe confirmar la acción de desactivación (dialogo de confirmación).
