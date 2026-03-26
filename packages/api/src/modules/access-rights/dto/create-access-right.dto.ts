import type { Id } from "@repo/common";

export type CreateAccessRightDto<Role> = {
    resourceId: Id;

    userId: Id;

    role: Role;
};
