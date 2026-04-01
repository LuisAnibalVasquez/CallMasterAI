# RF-5.05: Bloqueo de Llamadas en Días Feriados

## Información General
- **ID:** RF-5.05
- **Dominio:** DOM-5 — Dialing Rules
- **Bounded Context:** `DialingRules`
- **Trazabilidad:** Visión §9
- **Dependencias:** RF-5.03 (jurisdicción), RF-5.08 (catálogo de feriados)

## Resumen
El sistema **no debe realizar llamadas** en días feriados según el calendario del país/jurisdicción configurado por el tenant.

## User Story

**DADO QUE** una campaña está en ejecución con contactos pendientes,
**CUANDO** el sistema evalúa si puede realizar la siguiente llamada y la fecha actual corresponde a un **día feriado** en el calendario de la jurisdicción del tenant,
**ENTONCES** el sistema **no realiza la llamada**, trata el día como no hábil y espera al próximo día hábil no feriado.

---

**DADO QUE** un feriado cae en un día laboral de la semana (lunes a viernes),
**CUANDO** el sistema evalúa la disponibilidad de marcación,
**ENTONCES** trata ese día como **no hábil** (equivalente a sábado/domingo) y no realiza llamadas.

## Criterios Mínimos de Aceptación

- [ ] Antes de iniciar llamadas en un día, se verifica si la fecha actual es feriado según la jurisdicción del tenant.
- [ ] Si es día feriado, NO se ejecutan llamadas durante todo el día.
- [ ] Los feriados que caen en días laborales (lunes a viernes) se tratan como no hábiles.
- [ ] La verificación se realiza contra el catálogo de feriados mantenido manualmente (RF-5.08).
- [ ] Las campañas activas se reanudan automáticamente el siguiente día hábil no feriado.
- [ ] El estado de la campaña refleja el motivo de la pausa (día feriado).
