# RF-6.09: Alcance Full — Permisos Completos

## Información General
- **ID:** RF-6.09
- **Dominio:** DOM-6 — Integration API
- **Bounded Context:** `IntegrationAPI`
- **Trazabilidad:** Visión §10.1

## Resumen
El alcance `full` permite: crear/gestionar campañas, subir archivos, iniciar/detener ejecución, consultar estados, resultados y costos del tenant en ese ambiente.

## User Story

**DADO QUE** un sistema externo consume la API con una key de alcance `full`,
**CUANDO** ejecuta cualquier operación disponible (crear campaña, subir CSV, subir guion, iniciar campaña, consultar estados, descargar resultados, consultar costos),
**ENTONCES** la API autoriza y procesa todas las operaciones sin restricción de permisos.

## Criterios Mínimos de Aceptación

- [ ] Permite: crear campañas, subir CSV, subir guiones, iniciar/detener campañas.
- [ ] Permite: consultar estados, métricas, resultados descargables y costos.
- [ ] Es el alcance por defecto al crear una key (si no se especifica otro).
- [ ] Todas las operaciones están acotadas al tenant y ambiente de la key (RF-6.07).
