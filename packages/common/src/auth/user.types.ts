export type User = {
    id: string;

    email: string;

    metadata: {
        fullName?: string;

        avatar?: string;
    };
};
