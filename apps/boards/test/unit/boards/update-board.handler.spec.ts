import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createRepositoryMock } from "@api/common/mocks";
import type { UpdateBoardDto } from "@lib/boards";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Board } from "src/boards/entities/board.entity";
import { UpdateBoardCommand, UpdateBoardCommandHandler } from "src/boards/handlers/update-board.handler";
import { BoardsHelper } from "src/boards/lib/boards.helper";
import { createBoardsHelperMock } from "./mocks";
import { MockBoard } from "./mocks/board.mocks";

describe("UpdateBoardCommandHandler", () => {
    let handler: UpdateBoardCommandHandler;
    const boardsHelperMock = createBoardsHelperMock();
    const boardsRepositoryMock = createRepositoryMock<Board>();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UpdateBoardCommandHandler,
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

        handler = module.get(UpdateBoardCommandHandler);
    });

    afterEach(() => {
        clearMock(boardsHelperMock);
        clearMock(boardsRepositoryMock);
    });

    it("should update board", async () => {
        const dto: UpdateBoardDto = {
            title: "New title",
            description: "New description",
            icon: "new-icon-path.png"
        };

        boardsHelperMock.findOneById.mockResolvedValue(MockBoard);

        const command = new UpdateBoardCommand(MockBoard.id, dto);
        const result = await handler.execute(command);

        expect(result).toBe(MockBoard.id);
        expect(boardsHelperMock.findOneById).toHaveBeenCalledWith(MockBoard.id);
    });
});
