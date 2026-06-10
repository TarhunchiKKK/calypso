import type { Id } from "@lib/common";

export type VerifyEmailDto = {
    userId: Id;

    token: string;
};
