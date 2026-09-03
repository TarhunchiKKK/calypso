import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createRepositoryMock } from "@api/common/mocks";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import type { CreateBoardDto } from "src/boards/dto/create-board.dto";
import { Board } from "src/boards/entities/board.entity";
import { CreateBoardCommand, CreateBoardCommandHandler } from "src/boards/handlers/create-board.handler";

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
