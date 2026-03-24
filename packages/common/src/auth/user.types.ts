import type { Id } from "../shared/db.types";

export type User = {
    id: Id;

    email?: string;

    metadata: {
        fullName?: string;

        avatar?: string;
    };
};
