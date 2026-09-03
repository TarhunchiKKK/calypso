import { mock } from "bun:test";
import type { ConfigService } from "@nestjs/config";

export function createConfigServiceMock() {
    return {
        get: mock<ConfigService["get"]>((() => {}) as any),
        getOrThrow: mock<ConfigService["getOrThrow"]>((() => {}) as any),
        set: mock<ConfigService["set"]>((() => {}) as any)
    } satisfies Partial<Record<keyof ConfigService, unknown>>;
}
