import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { CacheKey, type GetCacheKeyFn } from "metadata/cache-key.decorator";
import { CacheTtl } from "metadata/cache-ttl.decorator";
import { CacheInterceptor } from "middleware/cache.interceptor";

export function Cache(fn: GetCacheKeyFn, ttl?: number) {
    const decorators = [UseInterceptors(CacheInterceptor), CacheKey(fn)];

    if (ttl !== undefined) {
        decorators.push(CacheTtl(ttl));
    }

    return applyDecorators(...decorators);
}
