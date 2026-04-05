import type { Id } from "../shared";
import type { ProjectCreator } from "./project-creator.entity";

export type Project = {
    id: Id;

    title: string;

    description?: string;

    thumbnail: string;

    creator: ProjectCreator;

    createdAt: Date;

    updatedAt?: Date;
};

export type ProjectTypes = "board" | "note";

export type ProjectWithType = Project & {
    type: ProjectTypes;
};
