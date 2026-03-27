import type { Id } from "../shared";

export type Project = {
    id: Id;

    title: string;
};

export type ProjectTypes = "board" | "note";

export type ProjectRoles = "creator" | "admin" | "editor" | "viewer";

export type ProjectOperations = "duplicate" | "edit-metadata" | "edit" | "remove" | "view" | "manage-access";
