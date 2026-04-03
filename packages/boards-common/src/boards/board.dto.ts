import type { Board } from "./board.entity";

export type CreateBoardDto = Pick<Board, "title" | "creator">;

export type UpdateBoardDto = Partial<Pick<Board, "title" | "description" | "thumbnail">>;
