# RF-2.05: Aislamiento de Datos Multitenant

## Información General
- **ID:** RF-2.05
- **Dominio:** DOM-2 — Tenant Management
- **Bounded Context:** `TenantManagement`
- **Trazabilidad:** Visión §4, §9

## Resumen
Los datos de cada tenant deben estar **aislados** (multitenant con separación lógica). Un tenant nunca debe ver datos de otro tenant bajo ninguna circunstancia.

## User Story

**DADO QUE** un usuario de un tenant está autenticado y consume cualquier recurso (portal o API),
**CUANDO** el sistema consulta o manipula datos,
**ENTONCES** aplica automáticamente un filtro de tenant en todas las operaciones de lectura y escritura, garantizando que solo se acceda a datos del tenant al que pertenece el usuario.

---

**DADO QUE** un usuario de un tenant intenta acceder a un recurso de otro tenant (manipulando IDs en URL o parámetros),
**CUANDO** el sistema evalúa la autorización,
**ENTONCES** rechaza la solicitud con HTTP 403 o HTTP 404 (sin revelar la existencia del recurso en otro tenant).

## Criterios Mínimos de Aceptación

- [ ] Todas las entidades de datos incluyen un campo `tenant_id` como discriminador.
- [ ] Todas las consultas a base de datos aplican filtro por `tenant_id` de forma automática (no manual por cada query).
- [ ] Un tenant no puede leer, modificar ni eliminar datos de otro tenant.
- [ ] Los intentos de acceso cross-tenant retornan HTTP 404 (no 403, para no revelar existencia).
- [ ] El aislamiento se garantiza tanto en portal como en API.
- [ ] Se implementa a nivel de capa de datos (middleware o filtro global) para evitar errores de omisión por parte de los desarrolladores.
- [ ] Los archivos subidos (CSV, guiones) se almacenan en rutas/carpetas segregadas por tenant.
