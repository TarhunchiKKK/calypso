import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createMongooseModelMock } from "@api/common";
import type { UpdateManyNodesDto } from "@lib/boards";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { UpdateManyNodesCommand, UpdateManyNodesCommandHandler } from "src/nodes/handlers/update-many-nodes.handler";
import { NodeBase } from "src/nodes/schemas/node-base.schema";
import { MockBoard } from "../boards/mocks/board.mocks";
import { MockNodes } from "./mocks";

describe("UpdateManyNodesCommandHandler", () => {
    let handler: UpdateManyNodesCommandHandler;
    const nodesModelMock = createMongooseModelMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UpdateManyNodesCommandHandler,
                {
                    provide: getModelToken(NodeBase.name),
                    useValue: nodesModelMock
                }
            ]
        }).compile();

        handler = module.get(UpdateManyNodesCommandHandler);
    });

    afterEach(() => {
        clearMock(nodesModelMock);
    });

    it("should replace nodes", async () => {
        const dto: UpdateManyNodesDto = {
            boardId: MockBoard.id,
            nodes: [MockNodes.sticker, MockNodes.arrow]
        };

        const command = new UpdateManyNodesCommand(dto);
        await handler.execute(command);

        expect(nodesModelMock.bulkWrite).toHaveBeenCalled();
    });
});
