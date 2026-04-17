import type { Id } from "@repo/common";

export type TokenPayload = {
    id: Id;

    email: string;

    username: string;
};
