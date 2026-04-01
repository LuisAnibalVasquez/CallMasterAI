# RF-5.03: Configuración de Jurisdicción y Calendario de Feriados

## Información General
- **ID:** RF-5.03
- **Dominio:** DOM-5 — Dialing Rules
- **Bounded Context:** `DialingRules`
- **Trazabilidad:** Visión §7, §9
- **Decisión de producto:** Calendario mantenido manualmente durante el MVP.

## Resumen
El tenant debe poder configurar la **jurisdicción/país** para el **calendario de días feriados**. Durante el MVP, el calendario de feriados será **mantenido manualmente** por el equipo de operaciones/plataforma.

## User Story

**DADO QUE** un administrador del tenant accede a la configuración de marcación,
**CUANDO** selecciona el país o jurisdicción aplicable para el calendario de feriados (ej: Venezuela, Puerto Rico),
**ENTONCES** el sistema asocia el calendario de feriados correspondiente a ese país y todas las campañas del tenant respetarán los días feriados de esa jurisdicción.

---

**DADO QUE** un tenant ha seleccionado su jurisdicción para feriados,
**CUANDO** hay un día feriado registrado en el calendario de ese país,
**ENTONCES** el sistema no realiza llamadas en ese día (RF-5.05).

## Criterios Mínimos de Aceptación

- [ ] Se ofrece un catálogo de países/jurisdicciones disponibles (al menos Venezuela y Puerto Rico para el MVP).
- [ ] El calendario de feriados es **mantenido manualmente** por el equipo de operaciones (RF-5.08).
- [ ] Las campañas **heredan** la jurisdicción del tenant — no pueden sobrescribirla.
- [ ] Se requiere configurar la jurisdicción antes de poder iniciar campañas.
- [ ] El tenant puede ver los feriados del año actual asociados a su jurisdicción.
