import type { Board } from "@repo/boards-common";

export type CreateBoardDto = {
    title: string;

    creator: Board["creator"];
};
