import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { Board, CreateBoardDto } from "@repo/boards-common";
import { BoardsApi, ProjectsApi } from "e2e/shared/api";

test.describe("GET /projets/one", () => {
    test("success", async ({ request }) => {
        let board: Board;

        await test.step("Create mock board", async () => {
            const dto: CreateBoardDto = {
                title: faker.word.words({ count: 2 }),
                thumbnail: faker.internet.url()
            };

            const result = await BoardsApi.create(request, dto);

            board = result.json;
        });

        await test.step("Get board", async () => {
            const { json: result } = await ProjectsApi.findOne(request, { id: board.id, type: "board" });

            expect(result).toEqual(board);
        });
    });
});
