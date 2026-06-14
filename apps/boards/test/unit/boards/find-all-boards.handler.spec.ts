import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createRepositoryMock } from "@api/common";
import type { PaginationOptions } from "@lib/common";
import type { ProjectFilters } from "@lib/projects";
import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Board } from "src/boards/entities/board.entity";
import { FindAllBoardsQuery, FindAllBoardsQueryHandler } from "src/boards/handlers/find-all-boards.handler";
import { MockBoard } from "./mocks/board.mocks";

describe("FindAllBoardsQueryHandler", () => {
    let handler: FindAllBoardsQueryHandler;
    const boardsRepositoryMock = createRepositoryMock();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAllBoardsQueryHandler,
                {
                    provide: getRepositoryToken(Board),
                    useValue: boardsRepositoryMock
                }
            ]
        }).compile();

        handler = module.get(FindAllBoardsQueryHandler);
    });

    afterEach(() => {
        clearMock(boardsRepositoryMock);
    });

    it("should find boards", async () => {
        const userId = crypto.randomUUID();

        const filters: ProjectFilters = {
            type: "board",
            sortOrder: "alphabetic",
            own: true
        };

        const pagination: PaginationOptions = {
            page: 0,
            count: 100
        };

        const boards: Board[] = [MockBoard];

        boardsRepositoryMock.find.mockResolvedValue(boards);

        const query = new FindAllBoardsQuery(userId, filters, pagination);
        const result = await handler.execute(query);

        expect(result).toEqual(boards);
    });
});
