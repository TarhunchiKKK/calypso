import { mock } from "bun:test";
import type { ConfigService } from "@nestjs/config";
import type { WithMockedMethods } from "entry";

export function createConfigServiceMock() {
    return {
        get: mock(() => ({})),
        getOrThrow: mock(() => ({})),
        set: mock(() => ({})),
        setEnvFilePaths: mock(() => ({}))
    } satisfies Partial<WithMockedMethods<ConfigService>>;
}
