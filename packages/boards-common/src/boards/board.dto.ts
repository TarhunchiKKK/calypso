import type { Board } from "./board.entity";

export type CreateBoardDto = Pick<Board, "title">;

export type UpdateBoardDto = Partial<Pick<Board, "title">>;
