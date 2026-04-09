import { faker } from "@faker-js/faker";
import type { APIRequestContext } from "@playwright/test";
import type { Board, CreateBoardDto, UpdateBoardDto } from "@repo/boards-common";
import type { Id } from "@repo/common";

export class BoardsApi {
    public static async create(request: APIRequestContext, dto: CreateBoardDto) {
        const response = await request.post("/boards", {
            data: dto
        });

        const json: Board = await response.json();

        return { response, json, dto };
    }

    public static createWithMock(request: APIRequestContext) {
        const dto: CreateBoardDto = {
            title: faker.word.words({ count: 2 }),
            thumbnail: faker.internet.url()
        };

        const result = BoardsApi.create(request, dto);

        return { ...result, dto };
    }

    public static async update(request: APIRequestContext, boardId: Id, dto: UpdateBoardDto) {
        const response = await request.patch(`/boards/${boardId}`, {
            data: dto
        });

        return { response, dto, boardId };
    }
}
