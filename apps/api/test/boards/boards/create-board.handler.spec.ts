import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import type { CreateBoardDto } from "@lib/boards";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Board } from "src/modules/boards/entities/board.entity";
import { CreateBoardCommand, CreateBoardCommandHandler } from "src/modules/boards/handlers/create-board.handler";
import { clearMock, createRepositoryMock } from "test/mocks";

describe("CreateBoardCommandHandler", () => {
    let handler: CreateBoardCommandHandler;
    const boardsRepositoryMock = createRepositoryMock<Board>();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CreateBoardCommandHandler,
                {
                    provide: getRepositoryToken(Board),
                    useValue: boardsRepositoryMock
                }
            ]
        }).compile();

        handler = module.get(CreateBoardCommandHandler);
    });

    afterEach(() => {
        clearMock(boardsRepositoryMock);
    });

    it("should crete board", async () => {
        const dto: CreateBoardDto = {
            icon: "",
            title: "New board",
            creatorId: crypto.randomUUID()
        };

        const command = new CreateBoardCommand(dto);
        await handler.execute(command);

        expect(boardsRepositoryMock.save).toHaveBeenCalledWith(dto);
    });
});
