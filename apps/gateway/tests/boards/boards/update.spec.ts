import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { Board, CreateBoardDto, UpdateBoardDto } from "@repo/boards-common";
import { BoardsApi, ProjectsApi } from "tests/shared/api";

test.describe("PATCH /boards", () => {
    test("success", async ({ request }) => {
        let board: Board;

        await test.step("Update board", async () => {
            const dto: CreateBoardDto = {
                title: faker.word.words({ count: 2 }),
                thumbnail: faker.internet.url()
            };

            board = await BoardsApi.create(request, dto);
        });

        const dto: UpdateBoardDto = {
            title: faker.word.words({ count: 2 }),
            description: faker.word.words({ count: 7 }),
            thumbnail: faker.internet.url()
        };

        await test.step("Update board", async () => {
            await BoardsApi.update(request, board.id, dto);
        });

        await test.step("Get board", async () => {
            const updatedBoard = await ProjectsApi.findOne(request, { id: board.id, type: "board" });

            expect(updatedBoard.title).toBe(dto.title);
            expect(updatedBoard.description).toBe(dto.description);
            expect(updatedBoard.thumbnail).toBe(dto.thumbnail);
        });
    });
});
