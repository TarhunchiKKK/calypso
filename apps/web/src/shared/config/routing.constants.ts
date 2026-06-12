import type { Id } from "@lib/common";

export const Routes = {
    home: "/",
    dashboard: "/dashboard",
    auth: {
        signUp: "/auth/sign-up",
        signIn: "/auth/sign-in"
    },
    account: {
        emailVerification: "/account/email-verification/:token",
        passwordRecovery: "/account/password-recovery/:token"
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
