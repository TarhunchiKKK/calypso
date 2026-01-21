import { Popover, PopoverContent, PopoverTrigger, ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit";
import type { DropdownItem } from "./types";

type Props<T> = {
    items: DropdownItem<T>[];

    placeholder: React.ReactNode;

    popoverOffset: number;
};

export function HorizontalDropdown<T extends string>({ items, popoverOffset, placeholder }: Props<T>) {
    return (
        <Popover>
            <PopoverTrigger className="cursor-pointer">{placeholder}</PopoverTrigger>

            <PopoverContent className="w-min p-0" sideOffset={popoverOffset}>
                <ToggleGroup type="single" variant="outline">
                    {items.map((item, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <Items order will never be changed>
                        <ToggleGroupItem key={index} value={item.value} className="cursor-pointer">
                            {item.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </PopoverContent>
        </Popover>
    );
}
