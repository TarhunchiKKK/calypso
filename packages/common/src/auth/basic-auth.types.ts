export type SignUpDto = {
    email: string;

    password: string;

    metadata?: Record<string, unknown>;
};

export type SignInDto = {
    email: string;

    password: string;
};
