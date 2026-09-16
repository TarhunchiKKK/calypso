import type { Id } from "@lib/common";

export type CreateAccessRightDto<Role> = {
    resourceId: Id;

    userId: Id;

    role: Role;
};
