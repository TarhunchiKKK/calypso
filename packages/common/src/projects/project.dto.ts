import type { ProjectWithType } from "entry";

export type DuplicateProjectDto = Pick<ProjectWithType, "id" | "type" | "title">;

export type FindOneProjectDto = Pick<ProjectWithType, "id" | "type">;

export type UpdateProjectDto = Partial<Pick<ProjectWithType, "type" | "title" | "thumbnail">>;

export type RemoveProjectDto = Pick<ProjectWithType, "id" | "type">;
