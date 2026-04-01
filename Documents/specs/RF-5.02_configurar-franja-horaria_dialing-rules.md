# RF-5.02: Configuración de Franja Horaria de Marcación

## Información General
- **ID:** RF-5.02
- **Dominio:** DOM-5 — Dialing Rules
- **Bounded Context:** `DialingRules`
- **Trazabilidad:** Visión §7, §9
- **Decisión de producto:** Las campañas heredan esta configuración sin posibilidad de sobrescribirla.

## Resumen
El tenant debe poder configurar la **franja horaria de marcación** con una ventana mínima de **8 horas diarias** en el reloj local. Las campañas **heredan** esta configuración.

## User Story

**DADO QUE** un administrador del tenant accede a la configuración de marcación,
**CUANDO** define la hora de inicio y hora de fin de la ventana de marcación (ej: 08:00 a 18:00),
**ENTONCES** el sistema valida que la ventana sea de al menos 8 horas, guarda la configuración y todas las campañas solo realizarán llamadas dentro de esta franja.

---

**DADO QUE** un administrador intenta configurar una franja menor a 8 horas,
**CUANDO** el sistema valida la configuración,
**ENTONCES** rechaza la configuración e informa que la ventana mínima es de 8 horas.

## Criterios Mínimos de Aceptación

- [ ] La franja se define con hora de inicio y hora de fin en formato 24h (reloj local del tenant).
- [ ] La ventana mínima es de **8 horas diarias** (validación estricta).
- [ ] Las campañas **heredan** la franja del tenant — no pueden sobrescribirla.
- [ ] Se requiere configurar la franja antes de poder iniciar campañas.
- [ ] La franja se evalúa en la zona horaria del tenant (RF-5.01).
- [ ] La configuración aplica a días hábiles (lunes a viernes por defecto, RF-5.06).
