import { faker } from "@faker-js/faker/.";
import { expect, test } from "@playwright/test";
import type { Board, CreateBoardDto } from "@repo/boards-common";
import type { UpdateProjectDto } from "@repo/common";
import { BoardsApi, ProjectsApi } from "tests/shared/api";

test.describe("PATCH /projects/:id", () => {
    test("success", async ({ request }) => {
        let board: Board;

        await test.step("Create mock board", async () => {
            const createDto: CreateBoardDto = {
                title: faker.word.words({ count: 2 }),
                thumbnail: faker.internet.url()
            };

            board = await BoardsApi.create(request, createDto);
        });

        const dto: UpdateProjectDto = {
            type: "board",
            title: faker.word.words({ count: 2 }),
            thumbnail: faker.internet.url()
        };

        await test.step("Update board", async () => {
            await ProjectsApi.update(request, board.id, dto);
        });

        await test.step("Get updated board", async () => {
            const updatedBoard = await ProjectsApi.findOne(request, {
                id: board.id,
                type: "board"
            });

            expect(updatedBoard.id).toBe(board.id);
            expect(updatedBoard.title).toBe(dto.title);
            expect(updatedBoard.thumbnail).toBe(dto.thumbnail);
        });
    });
});
