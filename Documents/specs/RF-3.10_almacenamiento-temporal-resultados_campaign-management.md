# RF-3.10: Almacenamiento Temporal de Resultados

## Información General
- **ID:** RF-3.10
- **Dominio:** DOM-3 — Campaign Management
- **Bounded Context:** `CampaignManagement`
- **Trazabilidad:** Visión §9
- **Dependencias:** RF-3.07 (descarga CSV resultados), RF-7.01 (correo de cierre)

## Resumen
Los resultados/transcripciones de interacciones deben almacenarse **temporalmente** solo hasta completar la entrega al tenant (correo de cierre + descarga de CSV disponible).

## User Story

**DADO QUE** una campaña ha finalizado y los resultados están disponibles,
**CUANDO** el sistema confirma que el correo de cierre ha sido enviado (RF-7.01) y el tenant ha tenido la oportunidad de descargar el CSV de resultados,
**ENTONCES** tras un período de gracia configurable, el sistema elimina los datos detallados de interacciones (transcripciones, datos de contacto por llamada) conservando solo los agregados (RF-3.09).

---

**DADO QUE** el período de gracia no ha expirado,
**CUANDO** el tenant accede a la campaña para descargar resultados,
**ENTONCES** los datos detallados aún están disponibles para descarga.

## Criterios Mínimos de Aceptación

- [ ] Los datos detallados están disponibles desde la finalización de la campaña hasta que expire el período de gracia.
- [ ] El período de gracia es configurable (ej: 7, 14 o 30 días).
- [ ] Tras el período de gracia, se ejecuta la eliminación automática de datos detallados.
- [ ] Antes de eliminar, se verifica que el correo de cierre (RF-7.01) fue enviado exitosamente.
- [ ] Tras la eliminación, solo quedan los datos agregados (RF-3.09).
- [ ] El tenant es notificado (en el portal) de la fecha límite para descargar los resultados detallados.
