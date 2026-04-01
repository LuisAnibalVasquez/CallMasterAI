# RF-5.04: Bloqueo de Llamadas Fuera de Franja Horaria

## Información General
- **ID:** RF-5.04
- **Dominio:** DOM-5 — Dialing Rules
- **Bounded Context:** `DialingRules`
- **Trazabilidad:** Visión §9
- **Dependencias:** RF-5.01 (zona horaria), RF-5.02 (franja horaria)

## Resumen
El sistema **no debe realizar llamadas** fuera de la franja horaria configurada por el tenant.

## User Story

**DADO QUE** una campaña está en ejecución con contactos pendientes,
**CUANDO** el sistema evalúa si puede realizar la siguiente llamada y la hora actual (en la zona horaria del tenant) está **fuera** de la franja de marcación configurada,
**ENTONCES** el sistema **no realiza la llamada**, pausar la ejecución y programa la reanudación para el inicio de la próxima franja hábil.

---

**DADO QUE** una campaña fue pausada por estar fuera de la franja horaria,
**CUANDO** se alcanza el inicio de la franja horaria del día hábil siguiente,
**ENTONCES** el sistema reanuda automáticamente las llamadas pendientes.

## Criterios Mínimos de Aceptación

- [ ] Antes de cada llamada, se evalúa si la hora actual (zona horaria del tenant) cae dentro de la franja configurada.
- [ ] Si está fuera de la franja, NO se ejecuta la llamada bajo ninguna circunstancia.
- [ ] La campaña se pausa automáticamente al finalizar la franja horaria del día.
- [ ] La campaña se reanuda automáticamente al iniciar la franja horaria del día hábil siguiente.
- [ ] Las llamadas en curso al momento de finalizar la franja **completan** su conversación pero no se inician nuevas.
- [ ] El estado de la campaña refleja el motivo de la pausa (fuera de horario).
