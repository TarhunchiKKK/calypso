import type React from "react";
import { Button, Popover, PopoverContent, PopoverTrigger, ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit";
import { Colors, PopoverSideOffset } from "./constants";

type Props = {
    renderItem: (color: string) => React.ReactNode;
};

export function ColorsDropdown({ renderItem }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" className="cursor-pointer">
                    {renderItem(Colors[0])}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[192px] p-0" sideOffset={PopoverSideOffset}>
                <ToggleGroup type="single" variant="default" className="w-full grid!">
                    <div className="grid grid-cols-4">
                        {Colors.map(color => (
                            <ToggleGroupItem key={color} value={color} className="cursor-pointer">
                                {renderItem(color)}
                            </ToggleGroupItem>
                        ))}
                    </div>
                </ToggleGroup>
            </PopoverContent>
        </Popover>
    );
}
