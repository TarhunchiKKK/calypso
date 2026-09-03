import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { CacheKeysList, type GetCacheKeysListFn } from "../metadata/cache-keys-list.decorator";
import { InvalidateCacheInterceptor } from "../middleware/invalidate-cache.interceptor";

export function InvalidateCache(fn: GetCacheKeysListFn) {
    return applyDecorators(UseInterceptors(InvalidateCacheInterceptor, CacheKeysList(fn)));
}
