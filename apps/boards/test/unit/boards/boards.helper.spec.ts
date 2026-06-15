import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createRepositoryMock } from "@api/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Board } from "src/boards/entities/board.entity";
import { BoardsHelper } from "src/boards/lib/boards.helper";
import { MockBoard } from "./mocks/board.mocks";

describe("BoardsHelper", () => {
    let helper: BoardsHelper;
    const boardsRepositoryMock = createRepositoryMock<Board>();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                BoardsHelper,
                {
                    provide: getRepositoryToken(Board),
                    useValue: boardsRepositoryMock
                }
            ]
        }).compile();

        helper = module.get(BoardsHelper);
    });

    afterEach(() => {
        clearMock(boardsRepositoryMock);
    });

    it("should found board", async () => {
        boardsRepositoryMock.findOne.mockResolvedValue(MockBoard);

        const result = await helper.findOneById(MockBoard.id);

        expect(result).toEqual(MockBoard);
        expect(boardsRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: MockBoard.id } });
    });

    it("should not found board", async () => {
        boardsRepositoryMock.findOne.mockResolvedValue(null);

        expect(helper.findOneById(MockBoard.id)).rejects.toThrow();
    });
});
