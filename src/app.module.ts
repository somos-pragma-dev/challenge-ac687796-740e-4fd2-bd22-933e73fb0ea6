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