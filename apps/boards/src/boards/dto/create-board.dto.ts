import type { Id } from "@repo/common";

export type CreateBoardDto = {
    title: string;

    thumbnail: string;

    creatorId: Id;
};
