import type { ProjectFilters } from "@lib/projects";
import { Dropdown } from "@/shared/ui";
import { OwnDropdownItems, SortOrdersDropdownItems, TypeDropdownItems } from "./ui.constants";

type Props = {
    filters: ProjectFilters;

    onChange: (filters: ProjectFilters) => void;
};

export function ProjectsFilters({ filters, onChange }: Props) {
    const onTypeFilterChange = (typeFilter: ProjectFilters["type"]) => {
        onChange({
            ...filters,
            type: typeFilter
        });
    };

    const onOwnFilterChange = (ownFilter: ProjectFilters["own"]) => {
        onChange({
            ...filters,
            own: ownFilter
        });
    };

    const onSortOrderChange = (sortOrder: ProjectFilters["sortOrder"]) => {
        onChange({
            ...filters,
            sortOrder
        });
    };

    const currentTypeFilter = TypeDropdownItems.find((item) => item.value === filters.type);
    const currentOwnerFilter = OwnDropdownItems.find((item) => item.value === filters.own);
    const currentSortOrder = SortOrdersDropdownItems.find((item) => item.value === filters.sortOrder);

    return (
        <div className="flex flex-row justify-end items-center gap-2">
            <Dropdown placeholder={currentTypeFilter ? currentTypeFilter.label : null} items={TypeDropdownItems} onSelect={onTypeFilterChange} />

            <Dropdown placeholder={currentOwnerFilter ? currentOwnerFilter.label : null} items={OwnDropdownItems} onSelect={onOwnFilterChange} />

            <Dropdown placeholder={currentSortOrder ? currentSortOrder.label : null} items={SortOrdersDropdownItems} onSelect={onSortOrderChange} />
        </div>
    );
}
