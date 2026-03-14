export type Board = {
    title: string;

    creatorId: string;

    createdAt: Date;

    updatedAt?: Date;
};

export type CreateBoardDto = Pick<Board, "title" | "creatorId">;

export type UpdateBoardDto = Partial<Pick<Board, "title">>;
