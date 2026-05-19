import type { ProjectOperations, ProjectRoles } from "@repo/projects";

export const AccessRightsRecord: Record<ProjectRoles, ProjectOperations[]> = {
    creator: ["view", "duplicate", "edit", "edit-metadata", "remove", "manage-access"],
    admin: ["view", "duplicate", "edit", "manage-access", "edit-metadata"],
    editor: ["view", "duplicate", "edit"],
    viewer: ["view", "duplicate"]
};
