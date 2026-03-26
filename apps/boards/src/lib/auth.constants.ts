import type { ProjectOperations, ProjectRoles } from "@repo/common/dist/projects";

export const AccessRightsRecord: Record<ProjectRoles, ProjectOperations[]> = {
    creator: ["view", "edit", "remove", "manage-access"],
    admin: ["view", "edit", "manage-access"],
    editor: ["view", "edit"],
    viewer: ["view"]
};
