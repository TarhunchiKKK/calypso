import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createMongooseModelMock } from "@api/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test, type TestingModule } from "@nestjs/testing";
import { RemoveNodesByBoardCommand, RemoveNodesByBoardCommandHandler } from "src/nodes/handlers/remove-nodes-by-board.handler";
import { NodeBase } from "src/nodes/schemas/node-base.schema";
import { MockBoard } from "../boards/mocks/board.mocks";

describe("RemoveNodesByBoardCommandHandler", () => {
    let handler: RemoveNodesByBoardCommandHandler;

    const nodesModelMock = createMongooseModelMock();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RemoveNodesByBoardCommandHandler,
                {
                    provide: getModelToken(NodeBase.name),
                    useValue: nodesModelMock
                }
            ]
        }).compile();

        handler = module.get(RemoveNodesByBoardCommandHandler);
    });

    afterEach(() => {
        clearMock(nodesModelMock);
    });

    it("should remove nodes", async () => {
        const command = new RemoveNodesByBoardCommand(MockBoard.id);

        const result = await handler.execute(command);

        expect(result).toBe(MockBoard.id);
        expect(nodesModelMock.deleteMany).toHaveBeenCalled();
    });
});
