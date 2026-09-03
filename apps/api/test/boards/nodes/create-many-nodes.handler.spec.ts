import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createMongooseModelMock } from "@api/common/mocks";
import type { CreateManyNodesDto } from "@lib/boards";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { CreateManyNodesCommand, CreateManyNodesCommandHandler } from "src/nodes/handlers/create-many-nodes.handler";
import { NodeBase } from "src/nodes/schemas/node-base.schema";
import { MockBoard } from "../boards/mocks/board.mocks";
import { MockNodesArray } from "./mocks";

describe("CreateManyNodesCommandHandler", () => {
    let handler: CreateManyNodesCommandHandler;
    const nodesModelMock = createMongooseModelMock<NodeBase>();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                CreateManyNodesCommandHandler,
                {
                    provide: getModelToken(NodeBase.name),
                    useValue: nodesModelMock
                }
            ]
        }).compile();

        handler = module.get(CreateManyNodesCommandHandler);
    });

    afterEach(() => {
        clearMock(nodesModelMock);
    });

    it("should create nodes", async () => {
        const dto: CreateManyNodesDto = {
            boardId: MockBoard.id,
            nodes: MockNodesArray
        };

        const command = new CreateManyNodesCommand(dto);
        await handler.execute(command);

        expect(nodesModelMock.insertMany).toHaveBeenCalled();
    });
});
