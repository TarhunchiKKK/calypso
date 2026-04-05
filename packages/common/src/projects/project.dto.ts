import type { Project } from "entry";

export type UpdateProjectDto = Partial<Pick<Project, "title" | "thumbnail">>;

export type DuplicateProjectDto = Pick<Project, "id" | "title">;
