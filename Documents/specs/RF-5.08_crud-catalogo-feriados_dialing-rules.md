# RF-5.08: CRUD de Catálogo de Feriados (Mantenimiento Manual)

## Información General
- **ID:** RF-5.08
- **Dominio:** DOM-5 — Dialing Rules
- **Bounded Context:** `DialingRules`
- **Trazabilidad:** Decisión de producto (2026-04-01)

## Resumen
El Owner o equipo de operaciones debe poder **gestionar manualmente** el catálogo de feriados por país/jurisdicción desde el portal (CRUD de fechas). Durante el MVP no se usa API externa de feriados.

## User Story

**DADO QUE** el Owner o un operador con permisos accede a la sección de gestión de feriados en el portal,
**CUANDO** crea una nueva entrada de feriado ingresando: país/jurisdicción, fecha y nombre del feriado,
**ENTONCES** el sistema lo agrega al catálogo y todos los tenants con esa jurisdicción configurada respetarán el nuevo feriado.

---

**DADO QUE** el Owner necesita corregir o eliminar un feriado,
**CUANDO** edita o elimina la entrada del catálogo,
**ENTONCES** el cambio se refleja inmediatamente para todos los tenants de esa jurisdicción.

---

**DADO QUE** un nuevo año inicia,
**CUANDO** el Owner accede al catálogo de feriados,
**ENTONCES** puede agregar los feriados del nuevo año manualmente (no se generan automáticamente).

## Criterios Mínimos de Aceptación

- [ ] CRUD completo: crear, leer, actualizar y eliminar feriados.
- [ ] Campos requeridos: país/jurisdicción, fecha, nombre del feriado.
- [ ] Los feriados se agrupan por país/jurisdicción.
- [ ] Al menos se deben precargar los calendarios de Venezuela y Puerto Rico.
- [ ] Los cambios se reflejan inmediatamente en la evaluación de marcación de las campañas activas.
- [ ] Se valida que no se dupliquen feriados (misma fecha y jurisdicción).
- [ ] Solo el Owner o usuarios con permisos de operación pueden gestionar el catálogo.
- [ ] El catálogo es visible (solo lectura) para los tenants desde su configuración.
