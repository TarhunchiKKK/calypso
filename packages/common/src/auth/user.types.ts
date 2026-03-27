import type { Id } from "../shared/db.types";

export type UserInfo = {
    id: Id;

    email?: string;

    avatar?: string;
};

export type User = {
    id: Id;

    email?: string;

    metadata: {
        fullName?: string;

        avatar?: string;
    };
};
