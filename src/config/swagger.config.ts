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