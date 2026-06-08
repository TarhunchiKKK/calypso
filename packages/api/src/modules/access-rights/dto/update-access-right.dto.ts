import type { Id } from "@lib/common";

export type UpdateAccessRightDto<Role> = {
    resourceId: Id;

    userId: Id;

    role: Role;
};
