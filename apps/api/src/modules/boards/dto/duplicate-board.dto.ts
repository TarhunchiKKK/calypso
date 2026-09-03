import type { Id } from "@lib/common";

export type DuplicateBoardDto = {
    id: Id;

    creatorId: Id;

    title: string;
};
