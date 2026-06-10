import type { Id } from "@lib/common";

export type UpdatePasswordDto = {
    userId: Id;

    password: string;

    token: string;
};
