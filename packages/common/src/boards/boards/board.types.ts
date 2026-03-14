export type Board = {
    id: string;

    title: string;

    createdAt: Date;

    updatedAt?: Date;
};

export type CreateBoardDto = Pick<Board, "title">;

export type UpdateBoardDto = Partial<Pick<Board, "title">>;
