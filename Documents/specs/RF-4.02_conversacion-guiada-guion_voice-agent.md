# RF-4.02: Conversación Guiada por Guion

## Información General
- **ID:** RF-4.02
- **Dominio:** DOM-4 — Voice Agent
- **Bounded Context:** `VoiceAgent`
- **Trazabilidad:** Visión §7
- **Dependencias:** RF-3.03 (guion cargado), RF-4.04 (idiomas)

## Resumen
Si la llamada es respondida, el agente de voz IA debe **seguir el guion** cargado por el tenant y mantener una conversación fluida con el contacto.

## User Story

**DADO QUE** una llamada saliente es respondida por el contacto,
**CUANDO** el agente de voz toma el control de la conversación,
**ENTONCES** sigue el guion cargado para la campaña, interpreta las respuestas del contacto mediante STT (speech-to-text), genera respuestas adecuadas con el LLM siguiendo el guion, y las transmite con TTS (text-to-speech) manteniendo una conversación natural.

---

**DADO QUE** el contacto responde algo no previsto en el guion,
**CUANDO** el agente no puede interpretar la respuesta o no tiene instrucciones específicas,
**ENTONCES** el agente intenta redirigir la conversación al tema del guion de forma natural, o si no es posible, cierra la llamada cortésmente registrando el resultado.

---

**DADO QUE** la conversación ha cubierto todos los puntos del guion,
**CUANDO** el agente llega al final del flujo conversacional,
**ENTONCES** cierra la llamada de forma cortés y registra el resultado completo de la interacción.

## Criterios Mínimos de Aceptación

- [ ] El agente sigue la estructura y contenido del guion cargado por el tenant.
- [ ] El agente utiliza STT para interpretar las respuestas del contacto en tiempo real.
- [ ] El agente utiliza TTS para generar voz a partir de las respuestas del LLM.
- [ ] La conversación es fluida con latencia aceptable (objetivo: < 2 segundos de respuesta).
- [ ] El agente maneja interrupciones (el contacto habla mientras el agente habla).
- [ ] Si la conversación se desvía del guion, el agente intenta reconducirla.
- [ ] Se registra el resultado de la conversación (RF-4.03).
- [ ] El agente cierra cortésmente si no puede avanzar en la conversación.
