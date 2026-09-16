import { mock } from "bun:test";
import type { TokensService } from "src/modules/auth/basic/services/tokens.service";
import type { WithMockedMethods } from "test/mocks";

export function createTokensServiceMock() {
    return {
        sign: mock(() => ({})),
        verify: mock(() => ({}))
    } satisfies WithMockedMethods<TokensService>;
}
