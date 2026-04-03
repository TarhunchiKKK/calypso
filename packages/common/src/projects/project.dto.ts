import { Project } from "entry";

export type UpdateProjectDto = Pick<Project, "title" | "thumbnail">;

export type DuplicateProjectDto = Pick<Project, "id" | "creator">;
