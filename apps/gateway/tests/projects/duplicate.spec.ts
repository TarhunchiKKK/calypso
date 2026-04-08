import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { Board, CreateBoardDto } from "@repo/boards-common";
import type { DuplicateProjectDto } from "@repo/common";
import { BoardsApi, ProjectsApi } from "../shared/api";

test.describe("POST /projects/duplicate", () => {
    test("success", async ({ request }) => {
        let board: Board;

        await test.step("Create mock board", async () => {
            const dto: CreateBoardDto = {
                title: faker.word.words({ count: 2 }),
                thumbnail: faker.internet.url()
            };

            board = await BoardsApi.create(request, dto);
        });

        await test.step("Duplicate board", async () => {
            const dto: DuplicateProjectDto = {
                id: board.id,
                type: "board",
                title: "New Board Title"
            };

            const copy = await ProjectsApi.duplicate(request, dto);

            expect(copy.id).toBe(board.id);
            expect(copy.title).toBe(dto.title);
            expect(copy.thumbnail).toBe(board.thumbnail);
        });
    });
});
