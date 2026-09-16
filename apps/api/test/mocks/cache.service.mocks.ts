import { mock } from "bun:test";
import type { CacheService } from "src/infra/cache/cache.service";

export function createCacheServiceMock() {
    return {
        get: mock<CacheService["get"]>((() => {}) as any),
        set: mock<CacheService["set"]>((() => {}) as any),
        remove: mock<CacheService["remove"]>((() => {}) as any)
    } satisfies Partial<Record<keyof CacheService, unknown>>;
}
