import type { Id } from "@lib/common";

export type CreateBoardDto = {
    title: string;

    icon: string;

    creatorId: Id;
};
