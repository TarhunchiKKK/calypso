import type { Id } from "@repo/common";

export type UpdateAccessRightDto<Role> = {
    resourceId: Id;

    userId: Id;

    role: Role;
};
