import type { Id } from "../shared/db.types";

export type Media = {
    id: Id;

    url: string;
};

export type MediaGroup = {
    id: Id;

    title: string;

    media: Media[];
};
