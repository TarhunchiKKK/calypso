import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createMongooseModelMock } from "@api/common/mocks";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { FindAllNodesQuery, FindAllNodesQueryHandler } from "src/nodes/handlers/find-all-nodes.handler";
import { NodeBase } from "src/nodes/schemas/node-base.schema";
import { MockBoard } from "../boards/mocks/board.mocks";
import { MockNodesArray } from "./mocks";

describe("FindAllNodesQueryHandler", () => {
    let handler: FindAllNodesQueryHandler;
    const nodesModelMock = createMongooseModelMock<NodeBase>();

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
        nodesModelMock.find.mockResolvedValue(MockNodesArray as any);

        const query = new FindAllNodesQuery(MockBoard.id);
        const result = await handler.execute(query);

        expect(result).toEqual(MockNodesArray as any);
        expect(nodesModelMock.find).toHaveBeenCalled();
    });
});
