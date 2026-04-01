# RF-4.03: Almacenamiento de Resultado/Transcripción

## Información General
- **ID:** RF-4.03
- **Dominio:** DOM-4 — Voice Agent
- **Bounded Context:** `VoiceAgent`
- **Trazabilidad:** Visión §7
- **Dependencias:** RF-3.07 (descarga resultados), RF-3.10 (almacenamiento temporal)

## Resumen
El agente debe almacenar temporalmente el **resultado y transcripción** de cada interacción hasta poder entregarla al tenant.

## User Story

**DADO QUE** una llamada finaliza (respondida con conversación o no respondida),
**CUANDO** el sistema registra el cierre de la interacción,
**ENTONCES** almacena de forma temporal: transcripción de la conversación, estado final de la llamada, duración, metadata relevante (hora de inicio/fin, idioma detectado) asociada al contacto y la campaña.

---

**DADO QUE** los datos de interacción están almacenados temporalmente,
**CUANDO** el tenant descarga el CSV de resultados (RF-3.07) o recibe el correo de cierre (RF-7.01),
**ENTONCES** los datos almacenados son la fuente para generar estos entregables.

## Criterios Mínimos de Aceptación

- [ ] Se almacena por cada interacción: transcripción completa (texto), estado final, duración, timestamps.
- [ ] El almacenamiento es temporal (se elimina según política de RF-3.10).
- [ ] Los datos están asociados al contacto, campaña y tenant correspondientes.
- [ ] Los datos son suficientes para generar el CSV de resultados (RF-3.07).
- [ ] El almacenamiento es seguro (cifrado en reposo si contiene datos sensibles).
- [ ] En caso de error durante la llamada, se almacena el estado parcial disponible con marcador de error.
