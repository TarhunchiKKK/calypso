import type { Id } from "@repo/common";
import type { ProjectRoles } from "@repo/common/dist/projects";

export class CreateAccessRightDto {
    public projectId: Id;

    public userId: Id;

    public role: ProjectRoles;
}
