import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createRepositoryMock } from "@api/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Board } from "src/boards/entities/board.entity";
import { RemoveBoardCommand, RemoveBoardCommandHandler } from "src/boards/handlers/remove-board.handler";
import { BoardsHelper } from "src/boards/lib/boards.helper";
import { createBoardsHelperMock } from "./mocks";
import { MockBoard } from "./mocks/board.mocks";

describe("RemoveBoardCommandHandler", () => {
    let handler: RemoveBoardCommandHandler;
    const boardsHelperMock = createBoardsHelperMock();
    const boardsRepositoryMock = createRepositoryMock();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RemoveBoardCommandHandler,
                {
                    provide: BoardsHelper,
                    useValue: boardsHelperMock
                },
                {
                    provide: getRepositoryToken(Board),
                    useValue: boardsRepositoryMock
                }
            ]
        }).compile();

        handler = module.get(RemoveBoardCommandHandler);
    });

    afterEach(() => {
        clearMock(boardsHelperMock);
        clearMock(boardsRepositoryMock);
    });

    it("should remove board", async () => {
        boardsHelperMock.findOneById.mockResolvedValue(MockBoard);

        const command = new RemoveBoardCommand(MockBoard.id);
        await handler.execute(command);

        expect(boardsHelperMock.findOneById).toHaveBeenCalledWith(MockBoard.id);
        expect(boardsRepositoryMock.remove).toHaveBeenCalledWith(MockBoard);
    });
});
