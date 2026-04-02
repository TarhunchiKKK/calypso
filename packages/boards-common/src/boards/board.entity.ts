import type { Id } from "@repo/common";

export type Board = {
    id: Id;

    title: string;

    creatorId: Id;

    createdAt: Date;

    updatedAt?: Date;
};
