import { type CallHandler, type ExecutionContext, Inject, Injectable, type NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CacheService } from "cache.service";
import { CacheKey } from "decorators/cache-key.decorator";
import { CacheTtl } from "decorators/cache-ttl.decorator";
import type { Request } from "express";
import { of, tap } from "rxjs";

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    public constructor(
        @Inject(CacheService) private readonly cacheService: CacheService,
        @Inject(Reflector) private readonly reflector: Reflector
    ) {}

    public async intercept(context: ExecutionContext, next: CallHandler) {
        const { key, ttl } = this.getCacheOptions(context);

        const cachedData = await this.cacheService.get(key);

        if (cachedData !== null) {
            return of(cachedData);
        }

        return next.handle().pipe(
            tap(async (response) => {
                await this.cacheService.set(key, response, ttl);
            })
        );
    }

    private getCacheOptions(context: ExecutionContext) {
        const handler = context.getHandler();

        const getCacheKey = this.reflector.get(CacheKey, handler);

        if (!getCacheKey) {
            throw new Error(`"CacheKey" decorator for "${context.getHandler()} not provided".`);
        }

        const ttl = this.reflector.get(CacheTtl, handler);

        const request = context.switchToHttp().getRequest() as Request;

        return { key: getCacheKey(request), ttl: ttl ?? undefined };
    }
}
