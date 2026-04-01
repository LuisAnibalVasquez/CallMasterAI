# RF-4.01: Llamadas Salientes Automáticas

## Información General
- **ID:** RF-4.01
- **Dominio:** DOM-4 — Voice Agent
- **Bounded Context:** `VoiceAgent`
- **Trazabilidad:** Visión §7
- **Dependencias:** RF-5.04 (ventana horaria), RF-5.05 (feriados), RF-3.02 (contactos cargados)

## Resumen
El sistema debe realizar **llamadas salientes automáticas** a los contactos de una campaña activa, respetando las reglas de marcación del tenant.

## User Story

**DADO QUE** una campaña está en estado "en ejecución" con contactos pendientes de llamar,
**CUANDO** el sistema detecta que se está dentro de la ventana de marcación del tenant y no es día feriado,
**ENTONCES** inicia llamadas salientes automáticas a los contactos pendientes según el orden de la lista, respetando la capacidad concurrente del sistema.

---

**DADO QUE** una campaña está activa pero es fuera de la ventana de marcación o día feriado,
**CUANDO** el sistema evalúa las reglas de marcación,
**ENTONCES** NO realiza llamadas y espera al próximo período hábil para reanudar.

---

**DADO QUE** una llamada es realizada a un contacto y no es respondida (sin respuesta, ocupado, número inválido),
**CUANDO** la llamada falla,
**ENTONCES** el sistema registra el resultado, marca al contacto con el estado correspondiente y avanza al siguiente contacto.

## Criterios Mínimos de Aceptación

- [ ] Las llamadas se ejecutan automáticamente sin intervención del usuario.
- [ ] Se respetan las reglas de marcación del tenant (RF-5.04, RF-5.05, RF-5.06, RF-5.07).
- [ ] Cada llamada se registra con: contacto, hora de inicio, hora de fin, estado (respondida, no respondida, ocupado, error).
- [ ] Los contactos se procesan en el orden del CSV cargado.
- [ ] El sistema gestiona la concurrencia de llamadas según capacidad del proveedor.
- [ ] En ambiente sandbox, las llamadas se simulan (no se realizan llamadas reales).
- [ ] Los números con formato inválido se marcan como error sin intentar la llamada.
