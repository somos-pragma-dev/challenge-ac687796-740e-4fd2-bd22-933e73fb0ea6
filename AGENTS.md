# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de una API REST en NestJS**.

| | |
|---|---|
| Tema | TypeScript NestJS |
| Nivel | junior-l1 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 10 |
| Patron arquitectonico | capas estándar |
| Tiempo estimado | 10 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.0`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @nestjs/common 10.3.0
- @nestjs/core 10.3.0
- @nestjs/platform-express 10.3.0
- @nestjs/typeorm 10.0.0
- typeorm 0.3.17
- @nestjs/swagger 7.1.13
- class-validator 0.14.0
- class-transformer 0.5.1
- rxjs 7.8.1
- reflect-metadata 0.1.13
- @nestjs/testing 10.3.0
- jest 29.7.0
- typescript 5.3.3

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración del entorno**: Proyecto NestJS inicial con entidades definidas y configuraciones básicas.
- **Fase 2 — Implementación de la funcionalidad básica**: Controlador de solicitudes de préstamos con validaciones y registro idempotente.
- **Fase 3 — Integración con servicios externos**: API integrada con motor antifraude y buró de riesgos, con manejo de errores.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `test/loan-requests/loan-requests.controller.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `test/loan-requests/loan-requests.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que falta y tenes que completar

### 1. Referencias colgando (1)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/loan-requests/services/loan-requests.service.ts` — `RiskBureauService.calculateRiskScore`
      Se invoca `calculateRiskScore` sobre `RiskBureauService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (19)

- `tsconfig.json`
- `src/main.ts`
- `package.json`
- `src/loan-requests/entities/loan-request.entity.ts`
- `src/loan-requests/dto/create-loan-request.dto.ts`
- `src/loan-requests/dto/update-loan-request.dto.ts`
- `src/app.module.ts`
- `src/loan-requests/controllers/loan-requests.controller.ts`
- `src/loan-requests/services/loan-requests.service.ts`
- `src/external-services/antifraud/antifraud.service.ts`
- `src/external-services/risk-bureau/risk-bureau.service.ts`
- `src/common/interceptors/idempotency.interceptor.ts`
- `src/common/validators/is-positive.decorator.ts`
- `src/common/validators/is-unique.decorator.ts`
- `src/config/database.config.ts`
- `src/config/swagger.config.ts`
- `test/loan-requests/loan-requests.controller.spec.ts`
- `test/loan-requests/loan-requests.service.spec.ts`
- `README.md`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src`
- `src/loan-requests`
- `src/loan-requests/dto`
- `src/loan-requests/entities`
- `src/loan-requests/services`
- `src/loan-requests/controllers`
- `src/external-services`
- `src/external-services/antifraud`
- `src/external-services/risk-bureau`
- `src/common`
- `src/common/validators`
- `src/common/interceptors`
- `src/config`
- `test`

## Verificacion

```bash
npm install && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Brecha que el reto ataca: API REST con NestJS, TypeORM y Swagger

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
