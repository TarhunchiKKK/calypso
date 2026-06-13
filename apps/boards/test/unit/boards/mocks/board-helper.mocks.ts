import { mock } from "bun:test";
import type { BoardsHelper } from "src/boards/lib/boards.helper";
import type { WithMockedMethods } from "test/mocks";

export function createBoardsHelperMock(): WithMockedMethods<BoardsHelper> {
    return {
        findOneById: mock(() => Promise.resolve({}))
    };
}
