import { faker } from "@faker-js/faker/.";
import { expect, test } from "@playwright/test";
import type { AnyNode, Board, CreateBoardDto } from "@repo/boards-common";
import { BoardsApi } from "e2e/shared/api";
import { BoardNodesApi } from "../../shared/api";

test.describe("POST /board-nodes", () => {
    test("success", async ({ request }) => {
        let board: Board;

        await test.step("Create board", async () => {
            const dto: CreateBoardDto = {
                title: faker.word.words({ count: 2 }),
                thumbnail: faker.internet.url()
            };

            const result = await BoardsApi.create(request, dto);

            board = result.json;
        });

        let mockNodes: AnyNode[];

        await test.step("Create nodes", async () => {
            const result = await BoardNodesApi.createManyWithMock(request, board.id);

            mockNodes = result.dto.nodes;
        });

        await test.step("Verify nodes", async () => {
            const { json: nodes } = await BoardNodesApi.findAll(request, board.id);

            for (const node of nodes) {
                expect(mockNodes.find(n => n.id === node.id)).toBeTruthy();
            }
        });
    });
});
