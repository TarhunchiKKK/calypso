import { mock } from "bun:test";
import type { BoardsHelper } from "src/modules/boards/lib/boards.helper";

export function createBoardsHelperMock() {
    return {
        findOneById: mock<BoardsHelper["findOneById"]>((() => {}) as any)
    };
}
