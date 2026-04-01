# RF-5.06: Marcación Lunes a Viernes por Defecto

## Información General
- **ID:** RF-5.06
- **Dominio:** DOM-5 — Dialing Rules
- **Bounded Context:** `DialingRules`
- **Trazabilidad:** Visión §9

## Resumen
Por defecto, el sistema solo marca de **lunes a viernes** en la zona horaria configurada por el tenant. Los fines de semana no se realizan llamadas.

## User Story

**DADO QUE** una campaña está en ejecución,
**CUANDO** el sistema evalúa si puede realizar llamadas y el día actual es **sábado o domingo** en la zona horaria del tenant,
**ENTONCES** el sistema **no realiza llamadas** y espera al próximo lunes hábil (no feriado) para reanudar.

## Criterios Mínimos de Aceptación

- [ ] Por defecto, solo se realizan llamadas de lunes a viernes.
- [ ] Sábados y domingos se tratan como días no hábiles (sin llamadas).
- [ ] La evaluación del día de la semana se realiza en la zona horaria del tenant (RF-5.01).
- [ ] Las campañas se reanudan automáticamente el lunes (si no es feriado).
- [ ] En el MVP, no se ofrece configuración para cambiar los días hábiles (siempre lunes a viernes).
