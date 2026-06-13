import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createRepositoryMock } from "@api/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Board } from "src/boards/entities/board.entity";
import { ChangeBoardUpdateDateCommand, ChangeBoardUpdateDateCommandHandler } from "src/boards/handlers/change-board-update-date.handler";
import { BoardsHelper } from "src/boards/lib/boards.helper";
import { createBoardsHelperMock } from "./mocks";

describe("ChangeBoardUpdateDateCommandHandler", () => {
    let handler: ChangeBoardUpdateDateCommandHandler;

    const boardsRepositoryMock = createRepositoryMock();

    const boardsHelperMock = createBoardsHelperMock();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChangeBoardUpdateDateCommandHandler,
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

        handler = module.get(ChangeBoardUpdateDateCommandHandler);
    });

    afterEach(() => {
        clearMock(boardsHelperMock);
        clearMock(boardsRepositoryMock);
    });

    it("should update board with 'updateDate' field", async () => {
        const mockBoard: Board = {
            id: crypto.randomUUID(),
            title: "Board title",
            icon: "",
            creatorId: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const command = new ChangeBoardUpdateDateCommand(mockBoard.id);

        boardsHelperMock.findOneById.mockResolvedValue(mockBoard);

        const result = await handler.execute(command);

        expect(result).toEqual(mockBoard.id);
    });

    it("should update board without 'updateDate' field", async () => {
        const mockBoard: Board = {
            id: crypto.randomUUID(),
            title: "Board title",
            icon: "",
            creatorId: crypto.randomUUID(),
            createdAt: new Date()
        };

        const command = new ChangeBoardUpdateDateCommand(mockBoard.id);

        boardsHelperMock.findOneById.mockResolvedValue(mockBoard);

        const result = await handler.execute(command);

        expect(result).toEqual(mockBoard.id);
    });
});
