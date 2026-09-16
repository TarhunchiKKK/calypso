import { mock } from "bun:test";
import type { JwtService } from "@nestjs/jwt";
import type { WithMockedMethods } from "test/mocks";

export function createJwtServiceMock() {
    return {
        sign: mock(() => ({})),
        signAsync: mock(() => Promise.resolve({})),
        verify: mock(() => ({})),
        verifyAsync: mock(() => Promise.resolve({})),
        decode: mock(() => ({}))
    } satisfies WithMockedMethods<JwtService>;
}
