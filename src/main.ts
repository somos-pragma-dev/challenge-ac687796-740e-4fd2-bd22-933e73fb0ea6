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