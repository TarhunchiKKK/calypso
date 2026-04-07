import type { Id, ProjectTypes } from "@repo/common";

export const Routes = {
    home: "/",
    dashboard: "/dashboard",
    auth: {
        signUp: "/auth/sign-up",
        signIn: "/auth/sign-in"
    },
    apps: {
        board: (id: Id) => `board/${id}`,
        note: (id: Id) => `note/${id}`
    } satisfies Record<ProjectTypes, (id: Id) => string>
};
