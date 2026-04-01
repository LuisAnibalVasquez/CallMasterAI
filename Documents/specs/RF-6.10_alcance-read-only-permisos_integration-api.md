# RF-6.10: Alcance Read Only — Solo Lectura

## Información General
- **ID:** RF-6.10
- **Dominio:** DOM-6 — Integration API
- **Bounded Context:** `IntegrationAPI`
- **Trazabilidad:** Visión §10.1

## Resumen
El alcance `read_only` permite solo lectura: listar campañas, estados, métricas y costos; sin crear, modificar ni ejecutar.

## User Story

**DADO QUE** un sistema externo consume la API con una key de alcance `read_only`,
**CUANDO** intenta consultar estados, métricas o costos (operaciones de lectura),
**ENTONCES** la API procesa y retorna los datos solicitados.

---

**DADO QUE** un sistema usa una key `read_only`,
**CUANDO** intenta crear una campaña, subir archivos o iniciar/detener ejecución (operaciones de escritura),
**ENTONCES** la API rechaza la solicitud con HTTP 403 (Forbidden).

## Criterios Mínimos de Aceptación

- [ ] Permite: listar campañas, consultar detalle/estado, ver métricas agregadas, consultar costos.
- [ ] NO permite: crear campañas, subir CSV, subir guiones, iniciar/detener campañas, gestionar keys.
- [ ] Operaciones no permitidas retornan HTTP 403 con mensaje indicando que la key es `read_only`.
- [ ] Las operaciones de lectura respetan el aislamiento de tenant y ambiente.
