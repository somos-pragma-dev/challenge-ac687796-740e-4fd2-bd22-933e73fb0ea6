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