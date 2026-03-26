import type { Id } from "../shared";

export type Project = {
    id: Id;

    title: string;
};

export type ProjectTypes = "board" | "note";

export type ProjectRoles = "creator" | "editor" | "viewer";
