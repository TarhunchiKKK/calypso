import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Board } from "src/boards/entities/board.entity";
import { ChangeBoardUpdateDateCommand, ChangeBoardUpdateDateCommandHandler } from "src/boards/handlers/change-board-update-date.handler";
import { BoardsHelper } from "src/boards/lib/boards.helper";
import { clearMock, createRepositoryMock } from "test/mocks";
import { createBoardsHelperMock } from "./mocks";

describe("ChangeBoardUpdateDateCommandHandler", () => {
    let handler: ChangeBoardUpdateDateCommandHandler;

    const mockBoardsRepository = createRepositoryMock();

    const mockBoardsHelper = createBoardsHelperMock();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChangeBoardUpdateDateCommandHandler,
                {
                    provide: BoardsHelper,
                    useValue: mockBoardsHelper
                },
                {
                    provide: getRepositoryToken(Board),
                    useValue: mockBoardsRepository
                }
            ]
        }).compile();

        handler = module.get(ChangeBoardUpdateDateCommandHandler);
    });

    afterEach(() => {
        clearMock(mockBoardsHelper);
        clearMock(mockBoardsRepository);
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

        mockBoardsHelper.findOneById.mockResolvedValue(mockBoard);

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

        mockBoardsHelper.findOneById.mockResolvedValue(mockBoard);

        const result = await handler.execute(command);

        expect(result).toEqual(mockBoard.id);
    });
});
