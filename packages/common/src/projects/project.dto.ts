import type { ProjectWithType } from "entry";

export type UpdateProjectDto = Partial<Pick<ProjectWithType, "type" | "title" | "thumbnail">>;

export type DuplicateProjectDto = Pick<ProjectWithType, "id" | "type" | "title">;

export type RemoveProjectDto = Pick<ProjectWithType, "id" | "type">;
