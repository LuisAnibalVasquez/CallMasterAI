# RF-4.07: Arquitectura de Componentes Reemplazables

## Información General
- **ID:** RF-4.07
- **Dominio:** DOM-4 — Voice Agent
- **Bounded Context:** `VoiceAgent`
- **Trazabilidad:** Visión §9

## Resumen
La arquitectura del agente debe permitir **reemplazo de componentes** (telephony, STT/TTS, LLM) con cambios acotados, manteniendo la misma interfaz hacia el tenant.

## User Story

**DADO QUE** el equipo decide cambiar un proveedor de un componente del agente (ej: cambiar de Twilio a otro proveedor de telefonía),
**CUANDO** se implementa el nuevo proveedor,
**ENTONCES** el cambio se realiza implementando la interfaz/abstracción existente sin modificar la lógica de negocio de campañas ni la interfaz del tenant (portal y API).

---

**DADO QUE** un componente del pipeline de voz es reemplazado,
**CUANDO** las campañas se ejecutan con el nuevo componente,
**ENTONCES** el tenant no percibe cambios en la interfaz, los datos, ni los formatos de resultado — la experiencia es transparente.

## Criterios Mínimos de Aceptación

- [ ] Cada componente del pipeline tiene una **interfaz/abstracción** definida (ej: `ITelephonyProvider`, `ISpeechToText`, `ITextToSpeech`, `IConversationEngine`).
- [ ] Los componentes concretos (Twilio, OpenAI, etc.) implementan estas interfaces.
- [ ] Cambiar un proveedor requiere: implementar la interfaz + cambiar configuración; NO requiere modificar la lógica de campañas, la API REST ni el portal.
- [ ] La selección del proveedor se gestiona por configuración (no hardcodeada).
- [ ] La interfaz hacia el tenant (formatos de entrada, formatos de resultado, endpoints API) permanece estable ante cambios de componentes internos.
- [ ] Se aplica el principio **DIP** (Dependency Inversion): la lógica de negocio depende de abstracciones, no de implementaciones concretas.
