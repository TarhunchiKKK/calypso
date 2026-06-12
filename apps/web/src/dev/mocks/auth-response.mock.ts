import type { AuthResponse } from "@lib/auth";

export const MockAuthResponse: AuthResponse = {
    user: {
        id: "user-id",
        email: "email@gmail.com",
        username: "test username",
        emailVerified: true
    },
    session: {
        accessToken: "access-token",
        refreshToken: "refresh-token"
    }
};
