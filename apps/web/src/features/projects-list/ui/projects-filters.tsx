import { Dropdown } from "@/shared/ui";
import { Input } from "@/shared/ui/kit";
import { OwnerDropdownItems, SortOrdersDropdownItems } from "../constants/filtering-dropdowns.constants";
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
