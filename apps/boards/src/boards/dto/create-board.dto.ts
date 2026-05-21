import type { Id } from "@repo/common";

export type CreateBoardDto = {
    title: string;

    icon: string;

    creatorId: Id;
};
