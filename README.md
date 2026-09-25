# Implementación de una API REST en NestJS

La empresa necesita una API REST para gestionar solicitudes de préstamos. Los actores involucrados son el originador de créditos, el motor antifraude y el buró de riesgos. La API debe soportar un throughput de 1 500 solicitudes/segundo en hora pico y mantener un SLA de 99.9%. La API debe registrar cada solicitud con idempotencia, asegurar que no se permitan nombres de préstamos duplicados y validar que el monto del préstamo no sea negativo.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | TypeScript NestJS |
| **Nivel** | junior-l1 |
| **Tipo** | practical |
| **Tiempo estimado** | 10 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración del entorno

**Objetivo:** Preparar el entorno de desarrollo para la implementación de la API.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar un proyecto básico de NestJS con TypeORM y Swagger.
- Definir las entidades básicas para las solicitudes de préstamos.
- Asegurar que el proyecto compile y ejecute sin errores.

**Entregable:** Proyecto NestJS inicial con entidades definidas y configuraciones básicas.

<details>
<summary>Pistas de conocimiento</summary>

- Importancia de la estructura de proyecto en NestJS.
- Uso de decoradores en TypeORM para definir entidades.

</details>

### Fase 2: Implementación de la funcionalidad básica

**Objetivo:** Implementar la funcionalidad para registrar y validar solicitudes de préstamos.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Crear un controlador para manejar las solicitudes de préstamos.
- Implementar la lógica para registrar una solicitud con idempotencia.
- Validar que el nombre del préstamo no esté duplicado y que el monto sea positivo.

**Entregable:** Controlador de solicitudes de préstamos con validaciones y registro idempotente.

<details>
<summary>Pistas de conocimiento</summary>

- Concepto de idempotencia en el contexto de solicitudes de préstamos.
- Manejo de validaciones en NestJS.

</details>

### Fase 3: Integración con servicios externos

**Objetivo:** Integrar la API con el motor antifraude y el buró de riesgos.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Configurar servicios para comunicarse con el motor antifraude y el buró de riesgos.
- Implementar la lógica para enviar solicitudes a estos servicios y manejar sus respuestas.
- Asegurar que la API continúe operando correctamente ante posibles fallos de estos servicios.

**Entregable:** API integrada con motor antifraude y buró de riesgos, con manejo de errores.

<details>
<summary>Pistas de conocimiento</summary>

- Estrategias para manejar servicios externos en una API.
- Técnicas para asegurar la resiliencia de la API ante fallos de servicios externos.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una API REST y cuál es su propósito en este contexto?
- **paraQueSirve**: ¿Para qué sirve el registro idempotente de solicitudes en este escenario?
- **comoSeUsa**: ¿Cómo se usa TypeORM para definir entidades en NestJS?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar validaciones en una API REST?
- **queDecisionesImplica**: ¿Qué decisiones implica la integración de la API con servicios externos?

## Criterios de Evaluacion

- Configuración correcta del proyecto NestJS.
- Implementación de la funcionalidad básica para registrar y validar solicitudes de préstamos.
- Integración exitosa con motor antifraude y buró de riesgos, con manejo de errores.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
