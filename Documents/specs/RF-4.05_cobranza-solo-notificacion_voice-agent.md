# RF-4.05: Cobranza Solo Notificación (Sin Negociación)

## Información General
- **ID:** RF-4.05
- **Dominio:** DOM-4 — Voice Agent
- **Bounded Context:** `VoiceAgent`
- **Trazabilidad:** Visión §9

## Resumen
En cobranza (MVP), el agente solo realiza **notificación** — sin negociación automática de acuerdos de pago. El alcance se limita a comunicar información según el guion.

## User Story

**DADO QUE** una campaña de tipo cobranza/notificación está en ejecución,
**CUANDO** el agente realiza una llamada y el contacto responde,
**ENTONCES** el agente transmite la información definida en el guion (recordatorio de pago, notificación de deuda, etc.) pero NO negocia montos, plazos ni acuerdos de pago.

---

**DADO QUE** un contacto solicita negociar un acuerdo de pago durante la llamada,
**CUANDO** el agente detecta esta intención,
**ENTONCES** informa cortésmente que no puede gestionar acuerdos y dirige al contacto a los canales de atención del tenant (si están indicados en el guion).

## Criterios Mínimos de Aceptación

- [ ] El agente NO negocia montos, plazos ni acuerdos de pago.
- [ ] El agente se limita a transmitir la información del guion.
- [ ] Si el contacto intenta negociar, el agente redirige a canales de atención del tenant.
- [ ] El resultado de la interacción registra si el contacto solicitó negociación (dato útil para el tenant).
- [ ] Esta restricción se documenta claramente para que los tenants diseñen sus guiones acorde.
