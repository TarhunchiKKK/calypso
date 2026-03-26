import type { ProjectOperations, ProjectRoles } from "@repo/common/dist/projects";

export const AccessRightsRecord: Record<ProjectRoles, ProjectOperations[]> = {
    creator: ["view", "edit", "remove", "manage-access"],
    admin: ["view", "edit", "manage-access"],
    editor: ["view", "edit"],
    viewer: ["view"]
};

export const Roles = {
    creator: "creator",
    admin: "admin",
    editor: "editor",
    viewer: "viewer"
} satisfies Record<string, ProjectRoles>;

export const Operations = {
    view: "view",
    edit: "edit",
    remove: "remove",
    manageAccess: "manage-access"
} satisfies Record<string, ProjectOperations>;
