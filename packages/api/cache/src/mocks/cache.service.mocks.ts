import { mock } from "bun:test";
import type { WithMockedMethods } from "@api/common";
import type { CacheService } from "cache.service";

export function createCacheServiceMock() {
    return {
        get: mock(() => Promise.resolve({})),
        set: mock(() => Promise.resolve({})),
        remove: mock(() => Promise.resolve({}))
    } satisfies Partial<WithMockedMethods<CacheService>>;
}
