import type { Id } from "shared";
import type { Project } from "../../projects";

export type Board = Project & {
    creatorId: Id;

    createdAt: Date;

    updatedAt?: Date;
};

export type CreateBoardDto = Pick<Board, "title">;

export type UpdateBoardDto = Partial<Pick<Board, "title">>;
