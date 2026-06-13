import { afterEach, beforeEach, describe, it } from "bun:test";
import { Test, type TestingModule } from "@nestjs/testing";
import { CreateManyNodesCommandHandler } from "src/nodes/handlers/create-many-nodes.handler";

describe("CreateManyNodesCommandHandler", () => {
    let handler: CreateManyNodesCommandHandler;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CreateManyNodesCommandHandler]
        }).compile();

        handler = module.get(CreateManyNodesCommandHandler);
    });

    afterEach(() => {
        // clearMock();
    });

    it("", async () => {});
});
