import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { CreateBoardDto } from "@repo/boards-common";
import { BoardsApi } from "tests/shared/api";

test.describe("POST /boards", () => {
    test("success", async ({ request }) => {
        const dto: CreateBoardDto = {
            title: faker.word.words({ count: 2 }),
            thumbnail: faker.internet.url()
        };

        const board = await BoardsApi.create(request, dto);

        expect(board.title).toBe(dto.title);
        expect(board.thumbnail).toBe(dto.thumbnail);
    });
});
