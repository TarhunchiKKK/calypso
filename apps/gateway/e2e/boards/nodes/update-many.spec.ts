import { faker } from "@faker-js/faker/.";
import { test } from "@playwright/test";
import type { Board, CreateBoardDto } from "@repo/boards-common";
import { BoardNodesApi, BoardsApi } from "../../shared/api";

test.describe("PATCH /board-nodes", () => {
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

        await test.step("Create nodes", async () => {
            await BoardNodesApi.createManyWithMock(request, board.id);
        });

        await test.step("Update nodes", async () => {
            await BoardNodesApi.updateManyWithMock(request, board.id);
        });
    });
});
