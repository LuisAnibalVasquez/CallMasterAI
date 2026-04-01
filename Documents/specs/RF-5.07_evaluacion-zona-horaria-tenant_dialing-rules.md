# RF-5.07: Evaluación según Zona Horaria del Tenant

## Información General
- **ID:** RF-5.07
- **Dominio:** DOM-5 — Dialing Rules
- **Bounded Context:** `DialingRules`
- **Trazabilidad:** Visión §9
- **Dependencias:** RF-5.01 (zona horaria del tenant)

## Resumen
El sistema debe evaluar el horario de marcación según la **zona horaria del tenant** (no del servidor). Todas las decisiones de ventana horaria y feriados usan el reloj del tenant.

## User Story

**DADO QUE** el servidor de la plataforma está en una zona horaria diferente a la del tenant (ej: servidor en UTC, tenant en America/Caracas UTC-4),
**CUANDO** el sistema evalúa si puede realizar llamadas,
**ENTONCES** convierte la hora del servidor a la zona horaria del tenant antes de evaluar la franja de marcación, el día de la semana y los feriados.

## Criterios Mínimos de Aceptación

- [ ] Todas las evaluaciones de horario usan la zona horaria del tenant, no la del servidor.
- [ ] La conversión de zonas horarias maneja correctamente cambios de horario de verano (DST) donde aplique.
- [ ] Las timestamps almacenadas internamente usan UTC; la conversión se realiza al evaluar reglas.
- [ ] Se valida con pruebas unitarias: un tenant en UTC-4 con franja 08:00-18:00 no recibe llamadas si son las 07:00 hora local (aunque sean las 11:00 UTC).
- [ ] La zona horaria IANA se resuelve correctamente para cada evaluación.
