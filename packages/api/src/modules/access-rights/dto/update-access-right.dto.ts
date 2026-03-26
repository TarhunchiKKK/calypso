import type { Id } from "@repo/common";

export type UpdateAccessRightDto = {
    resourceId: Id;

    userId: Id;

    role: string;
};
