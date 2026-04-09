import type { Id } from "@repo/common";

export const Routes = {
    home: "/",
    dashboard: "/dashboard",
    auth: {
        signUp: "/auth/sign-up",
        signIn: "/auth/sign-in"
    },
    apps: {
        board: {
            pattern: "/board/:id",
            get: (id: Id) => `/board/${id}`
        },
        note: {
            pattern: "/note/:id",
            get: (id: Id) => `/note/${id}`
        }
    }
};
