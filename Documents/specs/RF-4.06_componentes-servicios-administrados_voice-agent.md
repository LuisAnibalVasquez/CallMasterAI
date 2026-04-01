# RF-4.06: Implementación con Componentes/Servicios Administrados

## Información General
- **ID:** RF-4.06
- **Dominio:** DOM-4 — Voice Agent
- **Bounded Context:** `VoiceAgent`
- **Trazabilidad:** Visión §9

## Resumen
El agente de voz debe implementarse usando **componentes/servicios probados y administrados** (STT/TTS y motor conversacional/agent) para reducir tiempo de desarrollo y riesgos de calidad.

## User Story

**DADO QUE** el equipo de desarrollo implementa el agente de voz,
**CUANDO** selecciona los componentes del pipeline (STT, TTS, LLM, telephony),
**ENTONCES** utiliza servicios administrados de proveedores probados (ej: OpenAI, Twilio, Google, etc.) en lugar de desarrollar componentes propios, delegando la complejidad de IA y telefonía a estos servicios.

## Criterios Mínimos de Aceptación

- [ ] El pipeline de voz utiliza servicios administrados para STT (speech-to-text).
- [ ] El pipeline utiliza servicios administrados para TTS (text-to-speech).
- [ ] El motor conversacional/LLM es un servicio administrado (ej: OpenAI API).
- [ ] La integración de telefonía utiliza un proveedor administrado (ej: Twilio).
- [ ] No se entrenan ni despliegan modelos de IA propios en el MVP.
- [ ] La selección de proveedores considera: calidad, latencia, soporte de idiomas (español/inglés), costos y SLA.
- [ ] Se documenta la lista de proveedores/servicios utilizados y sus límites/pricing.
