import type { Id } from "../../shared/db.types";

export type Board = {
    id: Id;

    title: string;

    creatorId: Id;

    createdAt: Date;

    updatedAt?: Date;
};

export type CreateBoardDto = Pick<Board, "title" | "creatorId">;

export type UpdateBoardDto = Partial<Pick<Board, "title">>;
