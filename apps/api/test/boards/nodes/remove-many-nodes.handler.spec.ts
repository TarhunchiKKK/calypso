import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import type { RemoveManyNodesDto } from "@lib/boards";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { RemoveManyNodesCommand, RemoveManyNodesCommandHandler } from "src/modules/nodes/handlers/remove-many-nodes.handler";
import { NodeBase } from "src/modules/nodes/schemas/node-base.schema";
import { clearMock, createMongooseModelMock } from "test/mocks";
import { MockBoard } from "../boards/mocks/board.mocks";
import { MockNodesArray } from "./mocks";

describe("RemoveManyNodesCommandHandler", () => {
    let handler: RemoveManyNodesCommandHandler;
    const nodesModelMock = createMongooseModelMock<NodeBase>();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
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
            ids: MockNodesArray.map((node) => node.id)
        };

        const command = new RemoveManyNodesCommand(dto);
        await handler.execute(command);

        expect(nodesModelMock.deleteMany).toHaveBeenCalled();
    });
});
