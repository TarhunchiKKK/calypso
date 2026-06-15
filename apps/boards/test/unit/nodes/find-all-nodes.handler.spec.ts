import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createMongooseModelMock } from "@api/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { FindAllNodesQuery, FindAllNodesQueryHandler } from "src/nodes/handlers/find-all-nodes.handler";
import { NodeBase } from "src/nodes/schemas/node-base.schema";
import { MockBoard } from "../boards/mocks/board.mocks";
import { MockNodes } from "./mocks";

describe("FindAllNodesQueryHandler", () => {
    let handler: FindAllNodesQueryHandler;
    const nodesModelMock = createMongooseModelMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                FindAllNodesQueryHandler,
                {
                    provide: getModelToken(NodeBase.name),
                    useValue: nodesModelMock
                }
            ]
        }).compile();

        handler = module.get(FindAllNodesQueryHandler);
    });

    afterEach(() => {
        clearMock(nodesModelMock);
    });

    it("should find nodes", async () => {
        const nodes = [MockNodes.sticker, MockNodes.arrow];

        nodesModelMock.find.mockResolvedValue(nodes);

        const query = new FindAllNodesQuery(MockBoard.id);
        const result = await handler.execute(query);

        expect(result).toEqual(nodes as any);
        expect(nodesModelMock.find).toHaveBeenCalled();
    });
});
