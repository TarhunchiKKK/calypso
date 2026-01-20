import { TextAlignStart } from "lucide-react";
import { Button, Popover, PopoverContent, PopoverTrigger, ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit";
import type { NodeStyles } from "../types";
import { PopoverSideOffset, TextAligns } from "./lib";

type Props = {
    value: NodeStyles["borderStyle"];
};

export function BorderStyleDropdown({ value }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" className="cursor-pointer">
                    <TextAlignStart className="h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-min p-0" sideOffset={PopoverSideOffset}>
                <ToggleGroup type="single" variant="outline">
                    {TextAligns.map(align => (
                        <ToggleGroupItem key={align.value} value={align.value} className="cursor-pointer" data-state={value === align.value ? "on" : "off"}>
                            <align.Icon className="h-4 w-4" />
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </PopoverContent>
        </Popover>
    );
}
