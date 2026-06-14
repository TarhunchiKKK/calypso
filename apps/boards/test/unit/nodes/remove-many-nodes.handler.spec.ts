import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createMongooseModelMock } from "@api/common";
import type { RemoveManyNodesDto } from "@lib/boards";
import { getModelToken } from "@nestjs/mongoose";
import { Test, type TestingModule } from "@nestjs/testing";
import { RemoveManyNodesCommand, RemoveManyNodesCommandHandler } from "src/nodes/handlers/remove-many-nodes.handler";
import { NodeBase } from "src/nodes/schemas/node-base.schema";
import { MockBoard } from "../boards/mocks/board.mocks";
import { MockNodes } from "./mocks";

describe("RemoveManyNodesCommandHandler", () => {
    let handler: RemoveManyNodesCommandHandler;

    const nodesModelMock = createMongooseModelMock();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RemoveManyNodesCommandHandler,
                {
                    provide: getModelToken(NodeBase.name),
                    useValue: nodesModelMock
                }
            ]
        }).compile();

        handler = module.get(RemoveManyNodesCommandHandler);
    });

    afterEach(() => {
        clearMock(nodesModelMock);
    });

    it("should remove nodes", async () => {
        const dto: RemoveManyNodesDto = {
            boardId: MockBoard.id,
            ids: [MockNodes.sticker.id, MockNodes.arrow.id]
        };

        const command = new RemoveManyNodesCommand(dto);

        await handler.execute(command);

        expect(nodesModelMock.deleteMany).toHaveBeenCalled();
    });
});
