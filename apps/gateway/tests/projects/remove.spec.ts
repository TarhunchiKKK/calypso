import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { Board, CreateBoardDto } from "@repo/boards-common";
import { BoardsApi, ProjectsApi } from "tests/shared/api";

test.describe("DELETE /projects", () => {
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

        await test.step("Delete board", async () => {
            await ProjectsApi.remove(request, { id: board.id, type: "board" });
        });

        await test.step("Get deleted board", async () => {
            await expect(ProjectsApi.findOne(request, { id: board.id, type: "board" })).rejects.toHaveProperty("status", 404);
        });
    });
});
