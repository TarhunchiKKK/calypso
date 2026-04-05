import type { Id, ProjectTypes } from "@repo/common";

export const Routes = {
    home: "/",
    dashboard: "/dashboard",
    apps: {
        board: (id: Id) => `board/${id}`,
        note: (id: Id) => `note/${id}`
    } satisfies Record<ProjectTypes, (id: Id) => string>
};
