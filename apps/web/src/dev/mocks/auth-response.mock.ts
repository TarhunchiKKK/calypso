import type { AuthResponse } from "@repo/common";

export const MockAuthResponse: AuthResponse = {
    user: {
        id: "user-id",
        email: "email@gmail.com",
        metadata: {
            fullName: "John Doe",
            avatar: "https://github.com/shadcn.png"
        }
    },
    session: {
        accessToken: "access-token",
        refreshToken: "refresh-token"
    }
};
