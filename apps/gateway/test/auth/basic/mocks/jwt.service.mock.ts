import { mock } from "bun:test";
import type { WithMockedMethods } from "@api/common";
import type { JwtService } from "@nestjs/jwt";

export function createJwtServiceMock() {
    return {
        sign: mock(() => ({})),
        signAsync: mock(() => Promise.resolve({})),
        verify: mock(() => ({})),
        verifyAsync: mock(() => Promise.resolve({})),
        decode: mock(() => ({}))
    } satisfies WithMockedMethods<JwtService>;
}
