import { mock } from "bun:test";
import type { WithMockedMethods } from "@api/common";
import type { BoardsHelper } from "src/boards/lib/boards.helper";

export function createBoardsHelperMock(): WithMockedMethods<BoardsHelper> {
    return {
        findOneById: mock(() => Promise.resolve({}))
    };
}
