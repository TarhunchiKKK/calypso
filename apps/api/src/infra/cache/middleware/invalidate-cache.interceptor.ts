import { type CallHandler, type ExecutionContext, Inject, Injectable, type NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { tap } from "rxjs";
import { extractContextPayload } from "src/shared/core";
import { CacheService } from "../cache.service";
import { CacheKeysList } from "../metadata/cache-keys-list.decorator";

@Injectable()
export class InvalidateCacheInterceptor implements NestInterceptor {
    public constructor(
        @Inject(CacheService) private readonly cacheService: CacheService,
        @Inject(Reflector) private readonly reflector: Reflector
    ) {}

    public async intercept(context: ExecutionContext, next: CallHandler) {
        const { keys } = this.getCacheOptions(context);

        return next.handle().pipe(
            tap(() => {
                this.invalidateCache(keys);
            })
        );
    }

    private getCacheOptions(context: ExecutionContext) {
        const getCacheKeys = this.reflector.get(CacheKeysList, context.getHandler());

        if (!getCacheKeys) {
            throw new Error(`"CacheKeysList" decorator for ${context.getHandler()} method was not provided.`);
        }

        const request = extractContextPayload(context);

        const keys = getCacheKeys(request);

        return { keys };
    }

    private async invalidateCache(keys: string[]) {
        if (keys.length === 0) {
            return;
        }

        const promises = keys.map((key) => this.cacheService.remove(key));

        await Promise.all(promises);
    }
}
