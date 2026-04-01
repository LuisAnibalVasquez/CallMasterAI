# RF-3.07: Descarga de CSV de Resultados

## Información General
- **ID:** RF-3.07
- **Dominio:** DOM-3 — Campaign Management
- **Bounded Context:** `CampaignManagement`
- **Trazabilidad:** Visión §7

## Resumen
El tenant debe poder **descargar un CSV de resultados** con cada interacción (una fila por interacción) desde la vista de la campaña en el portal.

## User Story

**DADO QUE** un usuario del tenant accede a una campaña completada o con interacciones registradas,
**CUANDO** selecciona la opción de descargar resultados,
**ENTONCES** el sistema genera un archivo CSV con una fila por cada interacción realizada (contacto + resultado de la llamada + transcripción resumida) y lo descarga al equipo del usuario.

---

**DADO QUE** un usuario intenta descargar resultados de una campaña sin interacciones,
**CUANDO** la campaña está en estado borrador o no tiene llamadas procesadas,
**ENTONCES** el sistema informa que no hay resultados disponibles para descargar.

## Criterios Mínimos de Aceptación

- [ ] El CSV contiene una fila por cada interacción (llamada) realizada.
- [ ] Campos mínimos del CSV: nombre del contacto, teléfono, estado de la llamada, duración, fecha/hora, resultado/transcripción resumida.
- [ ] El archivo se genera bajo demanda al momento de la descarga.
- [ ] La descarga está disponible mientras los datos de la campaña persistan (antes de la limpieza según RF-3.08/RF-3.10).
- [ ] Solo usuarios del tenant propietario de la campaña pueden descargar los resultados.
- [ ] El nombre del archivo descargado incluye identificación de la campaña y fecha de generación.
- [ ] Este es el enlace referenciado en el correo de cierre de campaña (RF-7.01).
