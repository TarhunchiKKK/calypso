import type { ProjectsSortOrders, ProjectTypes } from "@lib/projects";
import type { DropdownItem } from "@/shared/ui";

export const TypeDropdownItems: DropdownItem<ProjectTypes | undefined>[] = [
    {
        label: "All",
        value: undefined
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

export const OwnDropdownItems: DropdownItem<boolean | undefined>[] = [
    {
        label: "Owned by anyone",
        value: undefined
    },
    {
        label: "Owned by me",
        value: true
    },
    {
        label: "Owned by others",
        value: false
    }
];

export const SortOrdersDropdownItems: DropdownItem<ProjectsSortOrders>[] = [
    {
        label: "Alphabetic",
        value: "alphabetic"
    },
    {
        label: "Last modified",
        value: "last-modified"
    },
    {
        label: "Last created",
        value: "last-created"
    }
];
