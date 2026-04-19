import type { Board } from "@repo/boards-common";

export type UpdateBoardDto = Partial<Pick<Board, "title" | "description" | "thumbnail">>;
