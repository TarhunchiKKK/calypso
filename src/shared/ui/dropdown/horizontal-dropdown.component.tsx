import { Button, Popover, PopoverContent, PopoverTrigger, ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit";
import type { DropdownItem } from "./types";

type Props<T> = {
    value: T;

    items: DropdownItem<T>[];

    placeholder: React.ReactNode;

    popoverOffset: number;
};

export function HorizontalDropdown<T extends string>({ value, items, popoverOffset, placeholder }: Props<T>) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" className="cursor-pointer">
                    {placeholder}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-min p-0" sideOffset={popoverOffset}>
                <ToggleGroup type="single" variant="outline">
                    {items.map((item, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <Items order will never be changed>
                        <ToggleGroupItem key={index} value={item.value} className="cursor-pointer" data-state={value === item.value ? "on" : "off"}>
                            {item.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </PopoverContent>
        </Popover>
    );
}
