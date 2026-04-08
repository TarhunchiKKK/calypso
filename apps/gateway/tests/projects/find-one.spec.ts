import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { Board, CreateBoardDto } from "@repo/boards-common";
import { BoardsApi, ProjectsApi } from "tests/shared/api";

test.describe("GET /projets/one", () => {
    test("success", async ({ request }) => {
        let board: Board;

        await test.step("Create mock board", async () => {
            const dto: CreateBoardDto = {
                title: faker.word.words({ count: 2 }),
                thumbnail: faker.internet.url()
            };

            board = await BoardsApi.create(request, dto);
        });

        await test.step("Get board", async () => {
            const result = await ProjectsApi.findOne(request, { id: board.id, type: "board" });

            expect(result).toEqual(board);
        });
    });
});
