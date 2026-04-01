# RF-4.04: Soporte de Idiomas Español e Inglés

## Información General
- **ID:** RF-4.04
- **Dominio:** DOM-4 — Voice Agent
- **Bounded Context:** `VoiceAgent`
- **Trazabilidad:** Visión §9

## Resumen
El agente de voz debe soportar conversaciones en **español e inglés**, especialmente relevante para Puerto Rico y campañas bilingües.

## User Story

**DADO QUE** un tenant configura una campaña y define el idioma de operación del agente,
**CUANDO** el agente inicia una llamada,
**ENTONCES** conduce la conversación en el idioma configurado (español o inglés), utilizando modelos STT/TTS y LLM adecuados para ese idioma.

---

**DADO QUE** un guion está escrito en un idioma específico,
**CUANDO** el agente inicia la conversación,
**ENTONCES** sigue el guion en el idioma en que fue escrito y mantiene coherencia idiomática durante toda la llamada.

## Criterios Mínimos de Aceptación

- [ ] El agente soporta conversaciones completas en **español**.
- [ ] El agente soporta conversaciones completas en **inglés**.
- [ ] Los modelos STT y TTS se configuran según el idioma de la campaña.
- [ ] El idioma del agente respeta el idioma del guion cargado por el tenant.
- [ ] La calidad de reconocimiento de voz (STT) es adecuada para acentos regionales (Venezuela, Puerto Rico, EE.UU.).
- [ ] En el MVP, el idioma se define por campaña (no por contacto individual).
