import { mock } from "bun:test";
import type { WithMockedMethods } from "@api/common";
import type { TokensService } from "src/auth/basic/services/tokens.service";

export function createTokensServiceMock() {
    return {
        sign: mock(() => ({})),
        verify: mock(() => ({}))
    } satisfies WithMockedMethods<TokensService>;
}
