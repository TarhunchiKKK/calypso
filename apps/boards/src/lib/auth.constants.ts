import type { ProjectOperations, ProjectRoles } from "@repo/common";

export const AccessRightsRecord: Record<ProjectRoles, ProjectOperations[]> = {
    creator: ["view", "duplicate", "edit", "edit-metadata", "remove", "manage-access"],
    admin: ["view", "duplicate", "edit", "manage-access", "edit-metadata"],
    editor: ["view", "duplicate", "edit"],
    viewer: ["view", "duplicate"]
};

export const Operations = {
    view: "view",
    edit: "edit",
    remove: "remove",
    manageAccess: "manage-access",
    duplicate: "duplicate",
    editMetadata: "edit-metadata"
} satisfies Record<string, ProjectOperations>;
