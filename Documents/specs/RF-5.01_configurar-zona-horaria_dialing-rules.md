# RF-5.01: Configuración de Zona Horaria del Tenant

## Información General
- **ID:** RF-5.01
- **Dominio:** DOM-5 — Dialing Rules
- **Bounded Context:** `DialingRules`
- **Trazabilidad:** Visión §7, §9
- **Decisión de producto:** Las campañas heredan esta configuración sin posibilidad de sobrescribirla.

## Resumen
El tenant debe poder configurar desde su dashboard la **zona horaria** aplicable a sus campañas. Las campañas **heredan** esta configuración sin posibilidad de sobrescribirla.

## User Story

**DADO QUE** un administrador del tenant accede a la configuración de marcación en su dashboard,
**CUANDO** selecciona la zona horaria aplicable a sus operaciones (ej: America/Caracas, America/Puerto_Rico),
**ENTONCES** el sistema guarda la configuración y todas las campañas del tenant utilizarán esta zona horaria para evaluar la ventana de marcación.

---

**DADO QUE** un tenant no ha configurado una zona horaria,
**CUANDO** se crea la primera campaña,
**ENTONCES** el sistema exige la configuración de zona horaria antes de permitir el inicio de campañas.

---

**DADO QUE** el tenant cambia su zona horaria,
**CUANDO** hay campañas activas en ejecución,
**ENTONCES** las campañas activas adoptan la nueva zona horaria de forma inmediata para las próximas evaluaciones de ventana de marcación.

## Criterios Mínimos de Aceptación

- [ ] La zona horaria se selecciona de un catálogo estándar IANA (ej: America/Caracas, America/Puerto_Rico).
- [ ] Las campañas **heredan** la zona horaria del tenant — no pueden sobrescribirla.
- [ ] La configuración se aplica a todas las campañas (nuevas y activas).
- [ ] Se requiere configurar zona horaria antes de poder iniciar campañas.
- [ ] La zona horaria se usa para evaluar la franja de marcación (RF-5.02) y días feriados (RF-5.05).
