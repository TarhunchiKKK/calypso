import type { AuthResponse } from "@repo/auth";

export const MockAuthResponse: AuthResponse = {
    user: {
        id: "user-id",
        email: "email@gmail.com",
        username: "test username"
    },
    session: {
        accessToken: "access-token",
        refreshToken: "refresh-token"
    }
};
