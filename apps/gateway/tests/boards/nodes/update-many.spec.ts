import { faker } from "@faker-js/faker/.";
import { test } from "@playwright/test";
import type { Board, CreateBoardDto } from "@repo/boards-common";
import { BoardsApi } from "tests/shared/api";
import { BoardNodesApi } from "tests/shared/api/board-nodes.api";

test.describe("PATCH /board-nodes", () => {
    test("success", async ({ request }) => {
        let board: Board;

        await test.step("Create board", async () => {
            const dto: CreateBoardDto = {
                title: faker.word.words({ count: 2 }),
                thumbnail: faker.internet.url()
            };

            board = await BoardsApi.create(request, dto);
        });

        await test.step("Create nodes", async () => {
            await BoardNodesApi.createManyWithMock(request, board.id);
        });

        await test.step("Update nodes", async () => {
            await BoardNodesApi.updateManyWithMock(request, board.id);
        });
    });
});
