import type { Project } from "../../projects";
import type { Id } from "../../shared";

export type Board = Project & {
    creatorId: Id;

    createdAt: Date;

    updatedAt?: Date;
};

export type CreateBoardDto = Pick<Board, "title" | "creatorId">;

export type UpdateBoardDto = Partial<Pick<Board, "title">>;
