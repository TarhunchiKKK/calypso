import type { Id } from "@repo/common";

export type Media = {
    id: Id;

    url: string;
};

export type MediaGroup = {
    id: Id;

    title: string;

    thumbnail: string;
};
