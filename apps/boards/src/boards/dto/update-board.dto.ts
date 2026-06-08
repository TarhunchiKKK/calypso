import type { Board } from "@lib/boards";

export type UpdateBoardDto = Partial<Pick<Board, "title" | "description" | "icon">>;
