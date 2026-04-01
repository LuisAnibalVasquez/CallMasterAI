# RF-3.08: Eliminación Automática de Archivos Post-Campaña

## Información General
- **ID:** RF-3.08
- **Dominio:** DOM-3 — Campaign Management
- **Bounded Context:** `CampaignManagement`
- **Trazabilidad:** Visión §9

## Resumen
Tras colgar la última llamada del último cliente de la campaña, el sistema debe **eliminar automáticamente** el CSV de clientes y el archivo de guion subidos para esa campaña.

## User Story

**DADO QUE** una campaña ha completado todas sus llamadas (última llamada del último contacto finalizada),
**CUANDO** el sistema detecta que no quedan interacciones pendientes,
**ENTONCES** elimina automáticamente el archivo CSV de contactos y el archivo de guion asociados a esa campaña del almacenamiento.

---

**DADO QUE** los archivos de entrada de una campaña han sido eliminados,
**CUANDO** un usuario intenta acceder al CSV o guion original de esa campaña,
**ENTONCES** el sistema informa que los archivos fueron eliminados según la política de minimización de datos y ya no están disponibles.

## Criterios Mínimos de Aceptación

- [ ] La eliminación se ejecuta automáticamente tras completar la última llamada de la campaña.
- [ ] Se eliminan: el archivo CSV de contactos y el archivo de guion.
- [ ] La eliminación es definitiva (no reversible).
- [ ] Los resultados/transcripciones de interacciones NO se eliminan en este paso (se mantienen temporalmente según RF-3.10).
- [ ] Los datos agregados (contadores, costos, métricas) NO se eliminan (se conservan según RF-3.09).
- [ ] Se registra un log interno de la eliminación (fecha, campaña, archivos eliminados).
- [ ] En caso de error en la eliminación, se implementa un mecanismo de reintento o alerta al equipo de operaciones.
