import type { ProjectTypes } from "@repo/common";
import { Dropdown } from "@/shared/ui";
import { Input } from "@/shared/ui/kit";
import {
    OwnerDropdownItems,
    SortOrdersDropdownItems,
    TypeDropdownItems
} from "../constants/filtering-dropdowns.constants";
import type { Filters, OwnerFilters, SortOrders } from "../types/filtering.types";

type Props = {
    filters: Filters;

    onChange: (filters: Filters) => void;
};

export function ProjectsFilters({ filters, onChange }: Props) {
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...filters,
            title: e.target.value
        });
    };

    const onTypeFilterChange = (typeFilter: ProjectTypes | null) => {
        onChange({
            ...filters,
            typeFilter
        });
    };

    const onOwnerFilterChange = (ownerFilter: OwnerFilters) => {
        onChange({
            ...filters,
            ownerFilter
        });
    };

    const onSortOrderChange = (sortOrder: SortOrders) => {
        onChange({
            ...filters,
            sortOrder
        });
    };

    const currentTypeFilter = TypeDropdownItems.find(item => item.value === filters.typeFilter);
    const currentOwnerFilter = OwnerDropdownItems.find(item => item.value === filters.ownerFilter);
    const currentSortOrder = SortOrdersDropdownItems.find(item => item.value === filters.sortOrder);

    return (
        <div className="flex flex-row justify-between items-center gap-4">
            <Input
                value={filters.title}
                onChange={onTitleChange}
                placeholder="Type to filter..."
                className="grow max-w-3/5"
            />

            <div className="flex flex-row justify-between items-center gap-2">
                <Dropdown
                    placeholder={currentTypeFilter ? currentTypeFilter.label : null}
                    items={TypeDropdownItems}
                    onSelect={onTypeFilterChange}
                />

                <Dropdown
                    placeholder={currentOwnerFilter ? currentOwnerFilter.label : null}
                    items={OwnerDropdownItems}
                    onSelect={onOwnerFilterChange}
                />

                <Dropdown
                    placeholder={currentSortOrder ? currentSortOrder.label : null}
                    items={SortOrdersDropdownItems}
                    onSelect={onSortOrderChange}
                />
            </div>
        </div>
    );
}
