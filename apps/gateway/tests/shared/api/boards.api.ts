import { type APIRequestContext, expect } from "@playwright/test";
import type { Board, CreateBoardDto, UpdateBoardDto } from "@repo/boards-common";
import type { Id } from "@repo/common";

export class BoardsApi {
    public static async create(request: APIRequestContext, dto: CreateBoardDto) {
        const response = await request.post("/boards", {
            data: dto
        });

        await expect(response).toBeOK();

        const board: Board = await response.json();

        return board;
    }

    public static async update(request: APIRequestContext, boardId: Id, dto: UpdateBoardDto) {
        const response = await request.patch(`/boards/${boardId}`, {
            data: dto
        });

        await expect(response).toBeOK();
    }
}
