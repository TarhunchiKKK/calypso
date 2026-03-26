import type { Id } from "@repo/common";

export type CreateAccessRightDto = {
    resourceId: Id;

    userId: Id;

    role: string;
};
