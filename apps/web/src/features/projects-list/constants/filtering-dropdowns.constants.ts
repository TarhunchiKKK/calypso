import type { ProjectTypes } from "@repo/projects";
import type { DropdownItem } from "@/shared/ui";
import { OwnerFilters, SortOrders } from "../types/filtering.types";

export const TypeDropdownItems: DropdownItem<ProjectTypes | null>[] = [
    {
        label: "All",
        value: null
    },
    {
        label: "Boards",
        value: "board"
    },
    {
        label: "Notes",
        value: "note"
    }
];

export const OwnerDropdownItems: DropdownItem<OwnerFilters>[] = [
    {
        label: "Owned by anyone",
        value: OwnerFilters.ANYONE
    },
    {
        label: "Owned by me",
        value: OwnerFilters.ME
    },
    {
        label: "Owned by others",
        value: OwnerFilters.NOT_ME
    }
];

export const SortOrdersDropdownItems: DropdownItem<SortOrders>[] = [
    {
        label: "Alphabetic",
        value: SortOrders.ALPHABETIC
    },
    {
        label: "Last modified",
        value: SortOrders.LAST_MODIFIED
    },
    {
        label: "Last created",
        value: SortOrders.LAST_CREATED
    }
];
