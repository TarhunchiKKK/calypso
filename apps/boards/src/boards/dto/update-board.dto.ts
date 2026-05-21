import type { Board } from "@repo/boards";

export type UpdateBoardDto = Partial<Pick<Board, "title" | "description" | "icon">>;
