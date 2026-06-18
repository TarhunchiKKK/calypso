import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock } from "@api/common/mocks";
import { Test } from "@nestjs/testing";
import { FindOneBoardQuery, FindOneBoardQueryHandler } from "src/boards/handlers/find-one-board.handler";
import { BoardsHelper } from "src/boards/lib/boards.helper";
import { createBoardsHelperMock } from "./mocks";
import { MockBoard } from "./mocks/board.mocks";

describe("FindOneBoardQueryHandler", () => {
    let handler: FindOneBoardQueryHandler;
    const boardsHelperMock = createBoardsHelperMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                FindOneBoardQueryHandler,
                {
                    provide: BoardsHelper,
                    useValue: boardsHelperMock
                }
            ]
        }).compile();

        handler = module.get(FindOneBoardQueryHandler);
    });

    afterEach(() => {
        clearMock(boardsHelperMock);
    });

    it("should return board", async () => {
        boardsHelperMock.findOneById.mockResolvedValue(MockBoard);

        const query = new FindOneBoardQuery(MockBoard.id);
        const result = await handler.execute(query);

        expect(result).toEqual(MockBoard);
        expect(boardsHelperMock.findOneById).toHaveBeenCalledWith(MockBoard.id);
    });
});
