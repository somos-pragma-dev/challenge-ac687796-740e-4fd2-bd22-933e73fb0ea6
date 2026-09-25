# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `test/loan-requests/loan-requests.controller.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `test/loan-requests/loan-requests.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/loan-requests/services/loan-requests.service.ts` — `RiskBureauService.calculateRiskScore`: Se invoca `calculateRiskScore` sobre `RiskBureauService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Contexto técnico original
API REST con NestJS, TypeORM y Swagger

### Reto
- Tema: TypeScript NestJS
- Seniority: junior-l1
- Tipo: practical
- Título: Implementación de una API REST en NestJS
- Tiempo estimado: 10 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del entorno — objetivo: Preparar el entorno de desarrollo para la implementación de la API. — entregable (NO resolver): Proyecto NestJS inicial con entidades definidas y configuraciones básicas.
- Fase 2: Implementación de la funcionalidad básica — objetivo: Implementar la funcionalidad para registrar y validar solicitudes de préstamos. — entregable (NO resolver): Controlador de solicitudes de préstamos con validaciones y registro idempotente.
- Fase 3: Integración con servicios externos — objetivo: Integrar la API con el motor antifraude y el buró de riesgos. — entregable (NO resolver): API integrada con motor antifraude y buró de riesgos, con manejo de errores.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "esModuleInterop": true,
    "strict": true,
    "strictPropertyInitialization": false,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "paths": {
      "@/*": ["src/*"],
      "@config/*": ["src/config/*"],
      "@common/*": ["src/common/*"],
      "@loan-requests/*": ["src/loan-requests/*"],
      "@external-services/*": ["src/external-services/*"]
    }
  },
  "exclude": ["node_modules", "dist", "test", "**/*.spec.ts"]
}

// === ARCHIVO: src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { IdempotencyInterceptor } from './common/interceptors/idempotency.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global de pipes y filtros
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new IdempotencyInterceptor());

  // Configuración de Swagger/OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Loan Requests API')
    .setDescription('API para gestión de solicitudes de préstamos')
    .setVersion('1.0')
    .addTag('loan-requests')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
  console.log('Swagger documentation available at: http://localhost:3000/api');
}
bootstrap();

// === ARCHIVO: package.json ===
{
  "name": "loan-requests-api",
  "version": "1.0.0",
  "description": "API para gestión de solicitudes de préstamos con validaciones e idempotencia",
  "main": "dist/main.js",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "10.3.0",
    "@nestjs/core": "10.3.0",
    "@nestjs/platform-express": "10.3.0",
    "@nestjs/typeorm": "10.0.0",
    "typeorm": "0.3.17",
    "@nestjs/swagger": "7.1.13",
    "class-validator": "0.14.0",
    "class-transformer": "0.5.1",
    "rxjs": "7.8.1",
    "reflect-metadata": "0.1.13"
  },
  "devDependencies": {
    "@nestjs/testing": "10.3.0",
    "jest": "29.7.0",
    "typescript": "5.3.3",
    "@types/node": "20.11.19",
    "@types/jest": "29.5.12",
    "@types/express": "4.17.21",
    "ts-jest": "29.1.2",
    "ts-node": "10.9.2",
    "tsconfig-paths": "4.2.0",
    "eslint": "8.56.0",
    "eslint-plugin-prettier": "5.1.3",
    "prettier": "3.2.5",
    "@nestjs/cli": "10.3.2"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: src/loan-requests/entities/loan-request.entity.ts ===
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum LoanRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  IN_REVIEW = 'IN_REVIEW'
}

@Entity('loan_requests')
export class LoanRequest {
  @ApiProperty({
    description: 'Identificador único de la solicitud de préstamo',
    example: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del solicitante del préstamo',
    example: 'Juan Pérez'
  })
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @ApiProperty({
    description: 'Monto solicitado para el préstamo',
    example: 5000
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({
    description: 'Estado actual de la solicitud de préstamo',
    enum: LoanRequestStatus,
    example: LoanRequestStatus.PENDING
  })
  @Column({
    type: 'enum',
    enum: LoanRequestStatus,
    default: LoanRequestStatus.PENDING
  })
  status: LoanRequestStatus;

  @ApiProperty({
    description: 'Fecha y hora de creación de la solicitud',
    example: '2023-11-15T10:00:00.000Z'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha y hora de la última actualización de la solicitud',
    example: '2023-11-15T10:30:00.000Z'
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Motivo de rechazo en caso de ser rechazada',
    example: 'Score de riesgo insuficiente',
    required: false
  })
  @Column({ type: 'text', nullable: true })
  rejectionReason?: string;

  @ApiProperty({
    description: 'Identificador de la transacción para idempotencia',
    example: 'req_abc123xyz'
  })
  @Column({ type: 'varchar', length: 50, unique: true })
  idempotencyKey: string;

  constructor(partial: Partial<LoanRequest> = {}) {
    Object.assign(this, partial);
  }
}

// === ARCHIVO: src/loan-requests/dto/create-loan-request.dto.ts ===
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';
import { IsUnique } from '../../common/validators/is-unique.decorator';

export class CreateLoanRequestDto {
  @ApiProperty({
    description: 'Nombre del solicitante del préstamo',
    example: 'Juan Pérez',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsUnique({
    message: 'Ya existe una solicitud con este nombre',
    entity: 'LoanRequest',
    field: 'name'
  })
  name: string;

  @ApiProperty({
    description: 'Monto solicitado para el préstamo',
    example: 5000,
    minimum: 0.01
  })
  @IsPositive({
    message: 'El monto debe ser un número positivo'
  })
  amount: number;

  @ApiProperty({
    description: 'Identificador de la transacción para idempotencia',
    example: 'req_abc123xyz',
    required: false
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  idempotencyKey: string;

  constructor(partial: Partial<CreateLoanRequestDto> = {}) {
    Object.assign(this, partial);
  }

  validate(): void {
    if (this.amount <= 0) {
      throw new Error('El monto debe ser mayor que cero');
    }
    if (!this.name || this.name.trim() === '') {
      throw new Error('El nombre no puede estar vacío');
    }
    if (!this.idempotencyKey || this.idempotencyKey.trim() === '') {
      throw new Error('La clave de idempotencia es obligatoria');
    }
  }
}

// === ARCHIVO: src/loan-requests/dto/update-loan-request.dto.ts ===
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { LoanRequestStatus } from '../entities/loan-request.entity';
import { CreateLoanRequestDto } from './create-loan-request.dto';

export class UpdateLoanRequestDto extends PartialType(CreateLoanRequestDto) {
  @ApiProperty({
    description: 'Nuevo nombre del solicitante (opcional)',
    example: 'Juan Pérez Actualizado',
    required: false
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @ApiProperty({
    description: 'Nuevo monto del préstamo (opcional)',
    example: 7000,
    required: false
  })
  @IsPositive({
    message: 'El monto debe ser un número positivo'
  })
  @IsOptional()
  amount?: number;

  @ApiProperty({
    description: 'Nuevo estado de la solicitud (opcional)',
    enum: LoanRequestStatus,
    example: LoanRequestStatus.IN_REVIEW,
    required: false
  })
  @IsEnum(LoanRequestStatus)
  @IsOptional()
  status?: LoanRequestStatus;

  @ApiProperty({
    description: 'Motivo de rechazo (opcional, solo para estado REJECTED)',
    example: 'Score de riesgo insuficiente',
    required: false
  })
  @IsString()
  @IsOptional()
  rejectionReason?: string;

  constructor(partial: Partial<UpdateLoanRequestDto> = {}) {
    super();
    Object.assign(this, partial);
  }

  validate(): void {
    if (this.status === LoanRequestStatus.REJECTED && !this.rejectionReason) {
      throw new Error('Debe proporcionar un motivo de rechazo para el estado REJECTED');
    }
    if (this.amount !== undefined && this.amount <= 0) {
      throw new Error('El monto debe ser mayor que cero');
    }
    if (this.name !== undefined && (!this.name || this.name.trim() === '')) {
      throw new Error('El nombre no puede estar vacío');
    }
  }
}

// === ARCHIVO: src/app.module.ts ===
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoanRequest } from './loan-requests/entities/loan-request.entity';
import { LoanRequestsController } from './loan-requests/controllers/loan-requests.controller';
import { LoanRequestsService } from './loan-requests/services/loan-requests.service';
import { databaseConfig } from './config/database.config';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { IdempotencyInterceptor } from './common/interceptors/idempotency.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      entities: [LoanRequest],
      synchronize: databaseConfig.synchronize,
      logging: databaseConfig.logging,
    }),
    TypeOrmModule.forFeature([LoanRequest]),
  ],
  controllers: [LoanRequestsController],
  providers: [
    LoanRequestsService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: IdempotencyInterceptor,
    },
    HttpExceptionFilter,
  ],
})
export class AppModule {}

// === ARCHIVO: src/loan-requests/controllers/loan-requests.controller.ts ===
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateLoanRequestDto } from '../dto/create-loan-request.dto';
import { UpdateLoanRequestDto } from '../dto/update-loan-request.dto';
import { LoanRequestsService } from '../services/loan-requests.service';
import { LoanRequest, LoanRequestStatus } from '../entities/loan-request.entity';
import { IdempotencyKey } from '../../common/decorators/idempotency-key.decorator';

@ApiTags('loan-requests')
@Controller('loan-requests')
export class LoanRequestsController {
  constructor(
    @Inject(forwardRef(() => LoanRequestsService))
    private readonly loanRequestsService: LoanRequestsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear una nueva solicitud de préstamo',
    description:
      'Registra una nueva solicitud de préstamo en el sistema. Requiere un identificador único para garantizar idempotencia.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Solicitud de préstamo creada exitosamente',
    type: LoanRequest,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Ya existe una solicitud con el mismo nombre',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de solicitud inválidos',
  })
  async create(
    @Body() createDto: CreateLoanRequestDto,
    @IdempotencyKey() idempotencyKey: string,
  ): Promise<LoanRequest> {
    return this.loanRequestsService.create(createDto, idempotencyKey);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las solicitudes de préstamos',
    description: 'Retorna una lista paginada de todas las solicitudes registradas en el sistema.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de solicitudes de préstamos',
    type: [LoanRequest],
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad de elementos por página' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: LoanRequestStatus,
    description: 'Filtrar por estado de la solicitud',
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: LoanRequestStatus,
  ): Promise<{ data: LoanRequest[]; total: number; page: number; limit: number }> {
    return this.loanRequestsService.findAll({ page, limit, status });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una solicitud de préstamo por ID',
    description: 'Retorna los detalles de una solicitud de préstamo específica.',
  })
  @ApiParam({ name: 'id', description: 'Identificador único de la solicitud', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Solicitud de préstamo encontrada',
    type: LoanRequest,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Solicitud de préstamo no encontrada',
  })
  async findOne(@Param('id') id: string): Promise<LoanRequest> {
    return this.loanRequestsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar una solicitud de préstamo',
    description: 'Actualiza los datos de una solicitud de préstamo existente.',
  })
  @ApiParam({ name: 'id', description: 'Identificador único de la solicitud', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Solicitud de préstamo actualizada exitosamente',
    type: LoanRequest,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Solicitud de préstamo no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Ya existe otra solicitud con el mismo nombre',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateLoanRequestDto,
  ): Promise<LoanRequest> {
    return this.loanRequestsService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar una solicitud de préstamo',
    description: 'Elimina permanentemente una solicitud de préstamo del sistema.',
  })
  @ApiParam({ name: 'id', description: 'Identificador único de la solicitud', type: String })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Solicitud de préstamo eliminada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Solicitud de préstamo no encontrada',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.loanRequestsService.remove(id);
  }
}

// === ARCHIVO: src/loan-requests/services/loan-requests.service.ts ===
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Validator } from 'class-validator';
import { LoanRequest, LoanRequestStatus } from '../entities/loan-request.entity';
import { CreateLoanRequestDto } from '../dto/create-loan-request.dto';
import { UpdateLoanRequestDto } from '../dto/update-loan-request.dto';
import { AntifraudService } from '../../external-services/antifraud/antifraud.service';
import { RiskBureauService } from '../../external-services/risk-bureau/risk-bureau.service';

interface FindAllOptions {
  page: number;
  limit: number;
  status?: LoanRequestStatus;
}

interface PaginationResult {
  data: LoanRequest[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class LoanRequestsService {
  private readonly validator: Validator;

  constructor(
    @InjectRepository(LoanRequest)
    private readonly loanRequestRepository: Repository<LoanRequest>,
    @Inject(forwardRef(() => AntifraudService))
    private readonly antifraudService: AntifraudService,
    @Inject(forwardRef(() => RiskBureauService))
    private readonly riskBureauService: RiskBureauService,
  ) {
    this.validator = new Validator();
  }

  async create(
    createDto: CreateLoanRequestDto,
    idempotencyKey: string,
  ): Promise<LoanRequest> {
    createDto.validate();

    if (createDto.amount <= 0) {
      throw new BadRequestException(
        'El monto del préstamo debe ser mayor que cero',
      );
    }

    const existingByName = await this.loanRequestRepository.findOne({
      where: { loanName: createDto.loanName } as FindOptionsWhere<LoanRequest>,
    });

    if (existingByName) {
      throw new ConflictException(
        `Ya existe una solicitud de préstamo con el nombre: ${createDto.loanName}`,
      );
    }

    const existingByIdempotency =
      await this.loanRequestRepository.findOne({
        where: { idempotencyKey } as FindOptionsWhere<LoanRequest>,
      });

    if (existingByIdempotency) {
      return existingByIdempotency;
    }

    const antifraudResult = await this.antifraudService.evaluate(
      createDto.applicantDocument,
      createDto.applicantEmail,
      createDto.amount,
    );

    if (!antifraudResult.approved) {
      const loanRequest = this.loanRequestRepository.create({
        loanName: createDto.loanName,
        amount: createDto.amount,
        applicantName: createDto.applicantName,
        applicantEmail: createDto.applicantEmail,
        applicantDocument: createDto.applicantDocument,
        status: LoanRequestStatus.REJECTED,
        rejectionReason: antifraudResult.reason,
        idempotencyKey,
      });

      return this.loanRequestRepository.save(loanRequest);
    }

    const riskScore = await this.riskBureauService.calculateRiskScore(
      createDto.applicantDocument,
      createDto.amount,
    );

    const status =
      riskScore.highRisk || riskScore.score > 700
        ? LoanRequestStatus.PENDING_REVIEW
        : LoanRequestStatus.APPROVED;

    const loanRequest = this.loanRequestRepository.create({
      loanName: createDto.loanName,
      amount: createDto.amount,
      applicantName: createDto.applicantName,
      applicantEmail: createDto.applicantEmail,
      applicantDocument: createDto.applicantDocument,
      status,
      idempotencyKey,
      riskScore: riskScore.score,
      riskLevel: riskScore.level,
    });

    return this.loanRequestRepository.save(loanRequest);
  }

  async findAll(options: FindAllOptions): Promise<PaginationResult> {
    const { page, limit, status } = options;
    const skip = (page - 1) * limit;

    const whereCondition: FindOptionsWhere<LoanRequest> = {};
    if (status) {
      whereCondition.status = status;
    }

    const [data, total] = await this.loanRequestRepository.findAndCount({
      where: whereCondition,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<LoanRequest> {
    const loanRequest = await this.loanRequestRepository.findOne({
      where: { id } as FindOptionsWhere<LoanRequest>,
    });

    if (!loanRequest) {
      throw new NotFoundException(
        `No se encontró la solicitud de préstamo con ID: ${id}`,
      );
    }

    return loanRequest;
  }

  async update(id: string, updateDto: UpdateLoanRequestDto): Promise<LoanRequest> {
    const loanRequest = await this.findOne(id);

    if (updateDto.loanName && updateDto.loanName !== loanRequest.loanName) {
      const existingByName = await this.loanRequestRepository.findOne({
        where: { loanName: updateDto.loanName } as FindOptionsWhere<LoanRequest>,
      });

      if (existingByName && existingByName.id !== id) {
        throw new ConflictException(
          `Ya existe otra solicitud de préstamo con el nombre: ${updateDto.loanName}`,
        );
      }
    }

    if (updateDto.amount !== undefined && updateDto.amount <= 0) {
      throw new BadRequestException(
        'El monto del préstamo debe ser mayor que cero',
      );
    }

    Object.assign(loanRequest, updateDto);

    return this.loanRequestRepository.save(loanRequest);
  }

  async remove(id: string): Promise<void> {
    const loanRequest = await this.findOne(id);
    await this.loanRequestRepository.remove(loanRequest);
  }

  async findByIdempotencyKey(key: string): Promise<LoanRequest | null> {
    return this.loanRequestRepository.findOne({
      where: { idempotencyKey: key } as FindOptionsWhere<LoanRequest>,
    });
  }
}

// === ARCHIVO: src/external-services/antifraud/antifraud.service.ts ===
import { Injectable, Logger } from '@nestjs/common';

export interface AntifraudRequest {
  documentNumber: string;
  amount: number;
  loanName: string;
  applicantName: string;
  email: string;
}

export interface AntifraudResponse {
  approved: boolean;
  riskScore: number;
  reasons?: string[];
  transactionId?: string;
}

@Injectable()
export class AntifraudService {
  private readonly logger = new Logger(AntifraudService.name);
  
  private readonly mockRules = {
    maxAmount: 50000,
    minAmount: 1000,
    highRiskDocuments: ['11111111111', '22222222222', '33333333333'],
    highRiskAmount: 40000,
    maxRiskScore: 50,
  };

  async evaluate(request: AntifraudRequest): Promise<AntifraudResponse> {
    this.logger.log(
      `Evaluating antifraud for document: ${request.documentNumber}, amount: ${request.amount}`
    );
    
    const reasons: string[] = [];
    let riskScore = 0;
    
    if (request.amount > this.mockRules.maxAmount) {
      const message = `Monto excede el maximo permitido de ${this.mockRules.maxAmount}`;
      reasons.push(message);
      riskScore += 50;
      this.logger.warn(message);
    }
    
    if (request.amount < this.mockRules.minAmount) {
      const message = `Monto menor al minimo permitido de ${this.mockRules.minAmount}`;
      reasons.push(message);
      riskScore += 30;
      this.logger.warn(message);
    }
    
    if (this.mockRules.highRiskDocuments.includes(request.documentNumber)) {
      const message = 'Documento en lista de alto riesgo';
      reasons.push(message);
      riskScore += 70;
      this.logger.warn(`${message} - Documento: ${request.documentNumber}`);
    }
    
    if (request.amount >= this.mockRules.highRiskAmount) {
      const message = 'Monto requiere revision adicional por monto alto';
      reasons.push(message);
      riskScore += 20;
      this.logger.warn(message);
    }
    
    if (!request.documentNumber || request.documentNumber.length < 8) {
      const message = 'Numero de documento invalido';
      reasons.push(message);
      riskScore += 40;
      this.logger.warn(message);
    }
    
    if (!request.applicantName || request.applicantName.trim().length === 0) {
      const message = 'Nombre del solicitante es requerido';
      reasons.push(message);
      riskScore += 25;
      this.logger.warn(message);
    }
    
    const approved = riskScore < this.mockRules.maxRiskScore;
    const transactionId = `AF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    this.logger.log(
      `Antifraud result: approved=${approved}, riskScore=${riskScore}, transactionId=${transactionId}`
    );
    
    return {
      approved,
      riskScore,
      reasons: reasons.length > 0 ? reasons : undefined,
      transactionId,
    };
  }
  
  async getTransactionStatus(transactionId: string): Promise<{ status: string; completedAt?: Date }> {
    this.logger.log(`Checking status for transaction: ${transactionId}`);
    
    return {
      status: 'COMPLETED',
      completedAt: new Date(),
    };
  }
}

// === ARCHIVO: src/external-services/risk-bureau/risk-bureau.service.ts ===
import { Injectable, Logger } from '@nestjs/common';

export interface RiskBureauRequest {
  documentNumber: string;
  firstName?: string;
  lastName?: string;
}

export interface RiskBureauResponse {
  hasDebt: boolean;
  debtAmount?: number;
  riskLevel: 'low' | 'medium' | 'high';
  bureauScore?: number;
  lastUpdated?: Date;
  queryId?: string;
}

@Injectable()
export class RiskBureauService {
  private readonly logger = new Logger(RiskBureauService.name);
  
  private readonly mockDebtRecords: Map<string, number> = new Map([
    ['44444444444', 5000],
    ['55555555555', 15000],
    ['66666666666', 35000],
    ['77777777777', 8000],
    ['88888888888', 22000],
  ]);
  
  private readonly mockRiskLevels: Record<string, 'low' | 'medium' | 'high'> = {
    '77777777777': 'high',
    '88888888888': 'medium',
    '99999999999': 'high',
  };
  
  private readonly mockBureauScores: Record<string, number> = {
    '77777777777': 450,
    '88888888888': 620,
    '99999999999': 380,
  };

  async checkRisk(request: RiskBureauRequest): Promise<RiskBureauResponse> {
    this.logger.log(
      `Checking risk bureau for document: ${request.documentNumber}`
    );
    
    const debtAmount = this.mockDebtRecords.get(request.documentNumber);
    const riskLevel = this.mockRiskLevels[request.documentNumber] || 'low';
    const bureauScore = this.mockBureauScores[request.documentNumber];
    
    const hasDebt = debtAmount !== undefined;
    
    if (hasDebt) {
      this.logger.warn(
        `Debt found for document ${request.documentNumber}: amount=${debtAmount}, riskLevel=${riskLevel}`
      );
    } else {
      this.logger.log(
        `No debt found for document ${request.documentNumber}, riskLevel=${riskLevel}`
      );
    }
    
    const queryId = `RB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    return {
      hasDebt,
      debtAmount,
      riskLevel,
      bureauScore,
      lastUpdated: new Date(),
      queryId,
    };
  }
  
  async getHistoricalRisk(documentNumber: string): Promise<{
    score: number;
    trend: 'improving' | 'stable' | 'declining';
    lastThreeMonths: number[];
  }> {
    this.logger.log(`Getting historical risk for document: ${documentNumber}`);
    
    const baseScore = this.mockBureauScores[documentNumber] || 700;
    
    return {
      score: baseScore,
      trend: 'stable',
      lastThreeMonths: [baseScore - 10, baseScore + 5, baseScore],
    };
  }
  
  async validateDocumentFormat(documentNumber: string): Promise<{
    valid: boolean;
    format: string;
  }> {
    const cleaned = documentNumber.replace(/\D/g, '');
    const valid = cleaned.length >= 8 && cleaned.length <= 11;
    
    return {
      valid,
      format: cleaned.length === 11 ? 'CPF' : cleaned.length === 8 ? 'DNI' : 'UNKNOWN',
    };
  }
}

// === ARCHIVO: src/common/interceptors/idempotency.interceptor.ts ===
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

interface IdempotencyCache {
  [key: string]: {
    response: any;
    timestamp: number;
  };
}

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  private cache: IdempotencyCache = {};
  private readonly CACHE_TTL_MS = 3600000;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const idempotencyKey = request.headers['idempotency-key'];

    if (!idempotencyKey) {
      throw new HttpException(
        'Idempotency-Key header is required for this operation',
        HttpStatus.BAD_REQUEST
      );
    }

    const cachedResponse = this.getCachedResponse(idempotencyKey);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle().pipe(
      tap(response => {
        this.cacheResponse(idempotencyKey, response);
      })
    );
  }

  private getCachedResponse(key: string): any | null {
    const cached = this.cache[key];
    if (!cached) {
      return null;
    }

    const isExpired = Date.now() - cached.timestamp > this.CACHE_TTL_MS;
    if (isExpired) {
      delete this.cache[key];
      return null;
    }

    return cached.response;
  }

  private cacheResponse(key: string, response: any): void {
    this.cache[key] = {
      response,
      timestamp: Date.now()
    };
  }

  clearCache(): void {
    this.cache = {};
  }
}

// === ARCHIVO: src/common/validators/is-positive.decorator.ts ===
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPositive(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPositive',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'El monto del préstamo debe ser un valor positivo',
        ...validationOptions
      },
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          if (value === undefined || value === null) {
            return true;
          }
          
          const numValue = typeof value === 'string' ? parseFloat(value) : value;
          
          if (isNaN(numValue)) {
            return false;
          }
          
          return numValue > 0;
        },
        defaultMessage(args: ValidationArguments): string {
          return `El campo ${args.property} debe contener un valor positivo mayor que cero`;
        }
      }
    });
  };
}

// === ARCHIVO: src/common/validators/is-unique.decorator.ts ===
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IsUniqueValidator {
  async checkUnique(table: string, field: string, value: any): Promise<boolean> {
    return true;
  }
}

export function IsUnique(
  table: string,
  field: string,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `Ya existe un registro con el mismo valor en el campo ${field}`,
        ...validationOptions
      },
      validator: {
        async validate(value: any, args: ValidationArguments): Promise<boolean> {
          if (!value) {
            return true;
          }

          const objectWithId = args.object as any;
          const currentId = objectWithId.id;

          return true;
        },
        defaultMessage(args: ValidationArguments): string {
          return `El valor '${args.value}' ya existe en el sistema para el campo ${args.property}`;
        }
      }
    });
  };
}

// === ARCHIVO: src/config/database.config.ts ===
import { DataSource, DataSourceOptions } from 'typeorm';
import { LoanRequest } from '../loan-requests/entities/loan-request.entity';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'loan_requests_db',
  entities: [LoanRequest],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  extra: {
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '20', 10),
    acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT || '30000', 10),
    idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
  },
  pool: {
    min: parseInt(process.env.DB_POOL_MIN || '2', 10),
    max: parseInt(process.env.DB_POOL_MAX || '20', 10),
    acquireTimeoutMillis: parseInt(process.env.DB_ACQUIRE_TIMEOUT || '30000', 10),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
  },
};

export const AppDataSource = new DataSource(databaseConfig);

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (): Promise<DataSource> => {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      return AppDataSource;
    },
  },
];

// === ARCHIVO: src/config/swagger.config.ts ===
import { DocumentBuilder, SwaggerModuleOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Loan Requests API')
  .setDescription('API para gestión de solicitudes de préstamos con validaciones, idempotencia e integración con servicios externos')
  .setVersion('1.0')
  .addTag('loan-requests', 'Endpoints para gestionar solicitudes de préstamos')
  .addTag('health', 'Endpoints de verificación de estado del sistema')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Ingrese el token JWT',
      in: 'header',
    },
    'JWT-auth',
  )
  .addOAuth2(
    {
      name: 'OAuth2',
      flow: 'accessCode',
      authorizationUrl: 'https://auth.example.com/authorize',
      tokenUrl: 'https://auth.example.com/token',
      scopes: {
        read: 'Leer solicitudes de préstamos',
        write: 'Crear y modificar solicitudes de préstamos',
      },
    },
  )
  .addServer('http://localhost:3000', 'Servidor de desarrollo')
  .addServer('https://api.example.com', 'Servidor de producción')
  .build();

export const swaggerOptions: SwaggerModuleOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    operationsSorter: 'method',
    tagsSorter: 'alpha',
    docExpansion: 'none',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
    syntaxHighlight: {
      activate: true,
      theme: 'monokai',
    },
  },
  customSiteTitle: 'Loan Requests API - Documentación',
  customfavIcon: '/assets/favicon.ico',
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { font-size: 2.5em; }
    .swagger-ui .info .description { font-size: 1.1em; line-height: 1.6; }
  `,
  customJs: '/assets/swagger-custom.js',
};

export const createSwaggerDocument = (app) => {
  return SwaggerModule.createDocument(app, swaggerConfig);
};

// === ARCHIVO: test/loan-requests/loan-requests.controller.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { LoanRequestsController } from '../../src/loan-requests/controllers/loan-requests.controller';
import { LoanRequestsService } from '../../src/loan-requests/services/loan-requests.service';
import { CreateLoanRequestDto } from '../../src/loan-requests/dto/create-loan-request.dto';
import { UpdateLoanRequestDto } from '../../src/loan-requests/dto/update-loan-request.dto';
import { LoanRequest, LoanRequestStatus } from '../../src/loan-requests/entities/loan-request.entity';

describe('LoanRequestsController', () => {
  let controller: LoanRequestsController;
  let service: LoanRequestsService;

  const mockLoanRequest: LoanRequest = {
    id: '1',
    name: 'Préstamo Personal',
    amount: 10000,
    status: LoanRequestStatus.PENDING,
    idempotencyKey: 'idem-123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockLoanRequestsService = {
    create: jest.fn().mockResolvedValue(mockLoanRequest),
    findAll: jest.fn().mockResolvedValue([mockLoanRequest]),
    findOne: jest.fn().mockResolvedValue(mockLoanRequest),
    update: jest.fn().mockResolvedValue({ ...mockLoanRequest, amount: 15000 }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanRequestsController],
      providers: [
        {
          provide: LoanRequestsService,
          useValue: mockLoanRequestsService,
        },
      ],
    }).compile();

    controller = module.get<LoanRequestsController>(LoanRequestsController);
    service = module.get<LoanRequestsService>(LoanRequestsService);
  });

  describe('create', () => {
    it('debería crear una solicitud de préstamo', async () => {
      const createDto: CreateLoanRequestDto = {
        name: 'Préstamo Personal',
        amount: 10000,
      };

      const result = await controller.create(createDto, 'idem-123');

      expect(result).toEqual(mockLoanRequest);
      expect(service.create).toHaveBeenCalledWith(createDto, 'idem-123');
    });

    it('debería manejar error de nombre duplicado', async () => {
      const createDto: CreateLoanRequestDto = {
        name: 'Préstamo Duplicado',
        amount: 5000,
      };

      mockLoanRequestsService.create.mockRejectedValueOnce(
        new Error('Ya existe una solicitud con este nombre'),
      );

      await expect(controller.create(createDto, 'idem-456')).rejects.toThrow(
        'Ya existe una solicitud con este nombre',
      );
    });

    it('debería rechazar monto negativo', async () => {
      const createDto: CreateLoanRequestDto = {
        name: 'Préstamo Negativo',
        amount: -1000,
      };

      mockLoanRequestsService.create.mockRejectedValueOnce(
        new Error('El monto debe ser positivo'),
      );

      await expect(controller.create(createDto, 'idem-789')).rejects.toThrow(
        'El monto debe ser positivo',
      );
    });
  });

  describe('findAll', () => {
    it('debería retornar todas las solicitudes de préstamo', async () => {
      const result = await controller.findAll();

      expect(result).toEqual([mockLoanRequest]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('debería retornar lista vacía cuando no hay solicitudes', async () => {
      mockLoanRequestsService.findAll.mockResolvedValueOnce([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('debería retornar una solicitud por ID', async () => {
      const result = await controller.findOne('1');

      expect(result).toEqual(mockLoanRequest);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('debería manejar error cuando no existe la solicitud', async () => {
      mockLoanRequestsService.findOne.mockRejectedValueOnce(
        new Error('Solicitud no encontrada'),
      );

      await expect(controller.findOne('999')).rejects.toThrow(
        'Solicitud no encontrada',
      );
    });
  });

  describe('update', () => {
    it('debería actualizar una solicitud de préstamo', async () => {
      const updateDto: UpdateLoanRequestDto = {
        amount: 15000,
      };

      const result = await controller.update('1', updateDto);

      expect(result.amount).toBe(15000);
      expect(service.update).toHaveBeenCalledWith('1', updateDto);
    });

    it('debería manejar error de nombre duplicado en actualización', async () => {
      const updateDto: UpdateLoanRequestDto = {
        name: 'Préstamo Existente',
      };

      mockLoanRequestsService.update.mockRejectedValueOnce(
        new Error('Ya existe una solicitud con este nombre'),
      );

      await expect(controller.update('1', updateDto)).rejects.toThrow(
        'Ya existe una solicitud con este nombre',
      );
    });
  });

  describe('remove', () => {
    it('debería eliminar una solicitud de préstamo', async () => {
      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('debería manejar error cuando no existe la solicitud a eliminar', async () => {
      mockLoanRequestsService.remove.mockRejectedValueOnce(
        new Error('Solicitud no encontrada'),
      );

      await expect(controller.remove('999')).rejects.toThrow(
        'Solicitud no encontrada',
      );
    });
  });
});

// === ARCHIVO: test/loan-requests/loan-requests.service.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanRequestsService } from '../../src/loan-requests/services/loan-requests.service';
import { LoanRequest, LoanRequestStatus } from '../../src/loan-requests/entities/loan-request.entity';
import { CreateLoanRequestDto } from '../../src/loan-requests/dto/create-loan-request.dto';
import { UpdateLoanRequestDto } from '../../src/loan-requests/dto/update-loan-request.dto';
import { AntifraudService } from '../../src/external-services/antifraud/antifraud.service';
import { RiskBureauService } from '../../src/external-services/risk-bureau/risk-bureau.service';

describe('LoanRequestsService', () => {
  let service: LoanRequestsService;
  let repository: Repository<LoanRequest>;
  let antifraudService: AntifraudService;
  let riskBureauService: RiskBureauService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockAntifraudService = {
    evaluate: jest.fn(),
  };

  const mockRiskBureauService = {
    checkRisk: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanRequestsService,
        {
          provide: getRepositoryToken(LoanRequest),
          useValue: mockRepository,
        },
        {
          provide: AntifraudService,
          useValue: mockAntifraudService,
        },
        {
          provide: RiskBureauService,
          useValue: mockRiskBureauService,
        },
      ],
    }).compile();

    service = module.get<LoanRequestsService>(LoanRequestsService);
    repository = module.get<Repository<LoanRequest>>(getRepositoryToken(LoanRequest));
    antifraudService = module.get<AntifraudService>(AntifraudService);
    riskBureauService = module.get<RiskBureauService>(RiskBureauService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createDto: CreateLoanRequestDto = {
      name: 'Préstamo Personal',
      amount: 10000,
    };

    it('debería crear una solicitud de préstamo exitosamente', async () => {
      const mockLoanRequest = {
        id: '1',
        ...createDto,
        status: LoanRequestStatus.PENDING,
        idempotencyKey: 'idem-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.create.mockReturnValue(mockLoanRequest);
      mockRepository.save.mockResolvedValue(mockLoanRequest);
      mockAntifraudService.evaluate.mockResolvedValue({ approved: true });
      mockRiskBureauService.checkRisk.mockResolvedValue({ riskLevel: 'low' });

      const result = await service.create(createDto, 'idem-123');

      expect(result).toEqual(mockLoanRequest);
      expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining(createDto));
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('debería rechazar nombre duplicado', async () => {
      mockRepository.findOne.mockResolvedValue({
        id: 'existing',
        name: 'Préstamo Personal',
      });

      await expect(service.create(createDto, 'idem-123')).rejects.toThrow(
        'Ya existe una solicitud con este nombre',
      );
    });

    it('debería rechazar monto negativo', async () => {
      const invalidDto: CreateLoanRequestDto = {
        name: 'Préstamo Negativo',
        amount: -1000,
      };

      await expect(service.create(invalidDto, 'idem-123')).rejects.toThrow(
        'El monto debe ser positivo',
      );
    });

    it('debería rechazar solicitud duplicada por clave de idempotencia', async () => {
      mockRepository.findOne.mockResolvedValue({
        id: 'existing-idempotency',
        idempotencyKey: 'idem-123',
      });

      const result = await service.create(createDto, 'idem-123');

      expect(result).toBeDefined();
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it('debería rechazar si el motor antifraude no aprueba', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue({ ...createDto, idempotencyKey: 'idem-123' });
      mockRepository.save.mockResolvedValue({ id: '1', ...createDto });
      mockAntifraudService.evaluate.mockResolvedValue({ approved: false, reason: 'Riesgo detectado' });

      await expect(service.create(createDto, 'idem-123')).rejects.toThrow(
        'Solicitud rechazada por motor antifraude',
      );
    });

    it('debería rechazar si el buró de riesgos indica alto riesgo', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue({ ...createDto, idempotencyKey: 'idem-123' });
      mockRepository.save.mockResolvedValue({ id: '1', ...createDto });
      mockAntifraudService.evaluate.mockResolvedValue({ approved: true });
      mockRiskBureauService.checkRisk.mockResolvedValue({ riskLevel: 'high' });

      await expect(service.create(createDto, 'idem-123')).rejects.toThrow(
        'Solicitud rechazada por bureau de riesgos',
      );
    });
  });

  describe('findAll', () => {
    it('debería retornar todas las solicitudes', async () => {
      const mockRequests = [
        { id: '1', name: 'Préstamo 1', amount: 1000 },
        { id: '2', name: 'Préstamo 2', amount: 2000 },
      ];

      mockRepository.find.mockResolvedValue(mockRequests);

      const result = await service.findAll();

      expect(result).toEqual(mockRequests);
      expect(mockRepository.find).toHaveBeenCalled();
    });

    it('debería retornar lista vacía cuando no hay solicitudes', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('debería retornar una solicitud por ID', async () => {
      const mockRequest = { id: '1', name: 'Préstamo 1', amount: 1000 };

      mockRepository.findOne.mockResolvedValue(mockRequest);

      const result = await service.findOne('1');

      expect(result).toEqual(mockRequest);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('debería lanzar error cuando no encuentra la solicitud', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(
        'Solicitud no encontrada',
      );
    });
  });

  describe('update', () => {
    it('debería actualizar una solicitud exitosamente', async () => {
      const existingRequest = { id: '1', name: 'Préstamo 1', amount: 1000 };
      const updateDto: UpdateLoanRequestDto = { amount: 2000 };

      mockRepository.findOne.mockResolvedValue(existingRequest);
      mockRepository.update.mockResolvedValue({ affected: 1 });
      mockRepository.findOne.mockResolvedValueOnce(existingRequest).mockResolvedValueOnce({
        ...existingRequest,
        ...updateDto,
      });

      const result = await service.update('1', updateDto);

      expect(result.amount).toBe(2000);
      expect(mockRepository.update).toHaveBeenCalledWith('1', updateDto);
    });

    it('debería rechazar nombre duplicado en actualización', async () => {
      const existingRequest = { id: '1', name: 'Préstamo 1', amount: 1000 };
      const updateDto: UpdateLoanRequestDto = { name: 'Préstamo 2' };

      mockRepository.findOne
        .mockResolvedValueOnce(existingRequest)
        .mockResolvedValueOnce({ id: '2', name: 'Préstamo 2' });

      await expect(service.update('1', updateDto)).rejects.toThrow(
        'Ya existe una solicitud con este nombre',
      );
    });

    it('debería rechazar monto negativo en actualización', async () => {
      const existingRequest = { id: '1', name: 'Préstamo 1', amount: 1000 };
      const updateDto: UpdateLoanRequestDto = { amount: -500 };

      mockRepository.findOne.mockResolvedValue(existingRequest);

      await expect(service.update('1', updateDto)).rejects.toThrow(
        'El monto debe ser positivo',
      );
    });
  });

  describe('remove', () => {
    it('debería eliminar una solicitud exitosamente', async () => {
      const mockRequest = { id: '1', name: 'Préstamo 1', amount: 1000 };

      mockRepository.findOne.mockResolvedValue(mockRequest);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove('1');

      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });

    it('debería lanzar error cuando no existe la solicitud a eliminar', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('999')).rejects.toThrow(
        'Solicitud no encontrada',
      );
    });
  });
});

// === ARCHIVO: README.md ===
# Loan Requests API

API REST para gestión de solicitudes de préstamos con validaciones e idempotencia.

## Requisitos Previos

- Node.js 20.x
- npm 10.x

## Instalación

```bash
npm install
```

## Configuración

El proyecto usa TypeORM con SQLite por defecto. La configuración de base de datos se encuentra en `src/config/database.config.ts`.

## Ejecución

### Desarrollo

```bash
npm run start:dev
```

La API estará disponible en `http://localhost:3000`

### Producción

```bash
npm run build
npm run start:prod
```

## Documentación API

Swagger disponible en: `http://localhost:3000/api`

## Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /loan-requests | Crear solicitud de préstamo |
| GET | /loan-requests | Listar todas las solicitudes |
| GET | /loan-requests/:id | Obtener solicitud por ID |
| PUT | /loan-requests/:id | Actualizar solicitud |
| DELETE | /loan-requests/:id | Eliminar solicitud |

## Pruebas

```bash
npm test
```

Con coverage:

```bash
npm run test:cov
```

## Estructura del Proyecto

```
src/
├── main.ts                      # Punto de entrada
├── app.module.ts                # Módulo principal
├── config/                      # Configuraciones
│   ├── database.config.ts
│   └── swagger.config.ts
├── common/                      # Componentes compartidos
│   ├── interceptors/
│   │   └── idempotency.interceptor.ts
│   └── validators/
│       ├── is-positive.decorator.ts
│       └── is-unique.decorator.ts
├── loan-requests/               # Módulo de solicitudes
│   ├── controllers/
│   ├── services/
│   ├── entities/
│   └── dto/
└── external-services/           # Servicios externos
    ├── antifraud/
    └── risk-bureau/
```

## Características

- **Validaciones**: Monto positivo, nombre único
- **Idempotencia**: Claves de idempotencia para evitar duplicados
- **Integración externa**: Motor antifraude y bureau de riesgos
- **Documentación**: OpenAPI/Swagger
- **TypeORM**: ORM para gestión de base de datos
```
