# RF-6.07: Key Acotada a Tenant y Ambiente

## Información General
- **ID:** RF-6.07
- **Dominio:** DOM-6 — Integration API
- **Bounded Context:** `IntegrationAPI`
- **Trazabilidad:** Visión §10.1

## Resumen
Cada API Key debe estar acotada a **un tenant** y **un ambiente** (sandbox o producción). No se comparten entre tenants ni entre ambientes.

## User Story

**DADO QUE** una API Key fue creada para el tenant A en ambiente producción,
**CUANDO** se utiliza esta key para consumir la API,
**ENTONCES** el sistema resuelve automáticamente que opera sobre los datos del tenant A en producción, sin posibilidad de acceder a datos de otro tenant o del ambiente sandbox.

---

**DADO QUE** un sistema intenta usar una key de sandbox para operar en producción (o viceversa),
**CUANDO** la API procesa la solicitud,
**ENTONCES** solo accede a los datos del ambiente de la key; no hay cruce de ambientes.

## Criterios Mínimos de Aceptación

- [ ] Cada key está asociada a exactamente un tenant y un ambiente.
- [ ] Una key de sandbox solo opera sobre datos de sandbox.
- [ ] Una key de producción solo opera sobre datos de producción.
- [ ] El tenant y ambiente se resuelven automáticamente desde la key (no se pasan como parámetros).
- [ ] No existe posibilidad de que una key acceda a datos de otro tenant.
