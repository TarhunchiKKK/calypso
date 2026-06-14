import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createMongooseModelMock, createRepositoryMock } from "@api/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import type { DuplicateBoardDto } from "src/boards/dto/duplicate-board.dto";
import { Board } from "src/boards/entities/board.entity";
import { DuplicateBoardCommand, DuplicateBoardCommandHandler } from "src/boards/handlers/duplicate-board.handler";
import { NodeBase } from "src/nodes/schemas/node-base.schema";
import { MockNodes } from "../nodes/mocks";
import { MockBoard } from "./mocks/board.mocks";

describe("DuplicateBoardCommandHandler", () => {
    let handler: DuplicateBoardCommandHandler;
    const boardsRepositoryMock = createRepositoryMock();
    const nodesModelMock = createMongooseModelMock();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DuplicateBoardCommandHandler,
                {
                    provide: getRepositoryToken(Board),
                    useValue: boardsRepositoryMock
                },
                {
                    provide: getModelToken(NodeBase.name),
                    useValue: nodesModelMock
                }
            ]
        }).compile();

        handler = module.get(DuplicateBoardCommandHandler);
    });

    afterEach(() => {
        clearMock(boardsRepositoryMock);
        clearMock(nodesModelMock);
    });

    it("should duplicate board with nodes", async () => {
        const dto: DuplicateBoardDto = {
            id: crypto.randomUUID(),
            title: "New board",
            creatorId: crypto.randomUUID()
        };

        const nodes: NodeBase[] = [MockNodes.sticker, MockNodes.arrow].map((node) => ({ ...node, boardId: dto.id })) as unknown as NodeBase[];

        boardsRepositoryMock.findOne.mockResolvedValueOnce(MockBoard);
        nodesModelMock.find.mockResolvedValueOnce(nodes);

        const command = new DuplicateBoardCommand(dto);
        await handler.execute(command);

        expect(boardsRepositoryMock.save).toHaveBeenCalledWith({ ...MockBoard, title: dto.title, creatorId: dto.creatorId });
        expect(nodesModelMock.find).toHaveBeenCalled();
        expect(nodesModelMock.insertMany).toHaveBeenCalled();
    });

    it("should duplicate board without nodes", async () => {
        const dto: DuplicateBoardDto = {
            id: crypto.randomUUID(),
            title: "New board",
            creatorId: crypto.randomUUID()
        };

        boardsRepositoryMock.findOne.mockResolvedValueOnce(MockBoard);
        nodesModelMock.find.mockResolvedValueOnce([]);

        const command = new DuplicateBoardCommand(dto);
        await handler.execute(command);

        expect(boardsRepositoryMock.save).toHaveBeenCalledWith({ ...MockBoard, title: dto.title, creatorId: dto.creatorId });
        expect(nodesModelMock.find).toHaveBeenCalled();
        expect(nodesModelMock.insertMany).toHaveBeenCalled();
    });

    it("should not found board", async () => {
        const dto: DuplicateBoardDto = {
            id: crypto.randomUUID(),
            title: "New board",
            creatorId: crypto.randomUUID()
        };

        boardsRepositoryMock.findOne.mockResolvedValue(null as any);

        const command = new DuplicateBoardCommand(dto);
        expect(handler.execute(command)).rejects.toThrow();

        expect(boardsRepositoryMock.save).not.toHaveBeenCalled();
        expect(nodesModelMock.find).not.toHaveBeenCalled();
        expect(nodesModelMock.insertMany).not.toHaveBeenCalled();
    });
});
