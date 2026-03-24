import type { Session } from "./session.types";
import type { User } from "./user.types";

export type SignUpDto = {
    email: string;

    password: string;

    metadata?: Record<string, unknown>;
};

export type SignInDto = {
    email: string;

    password: string;
};

export type AuthResponse = {
    user: User;

    session: Session;
};
