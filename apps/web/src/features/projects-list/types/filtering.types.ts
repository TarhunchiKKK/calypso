import type { ProjectTypes } from "@repo/projects";

export enum OwnerFilters {
    ANYONE,
    ME,
    NOT_ME
}

export enum SortOrders {
    ALPHABETIC,
    LAST_CREATED,
    LAST_MODIFIED
}

export type Filters = {
    title?: string;

    typeFilter: ProjectTypes | null;

    ownerFilter: OwnerFilters;

    sortOrder: SortOrders;
};
