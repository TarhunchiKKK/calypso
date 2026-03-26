import type { Id } from "@repo/common";

export type RemoveAccessRightDto = {
    resourceId: Id;

    userId: Id;
};
