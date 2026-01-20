import { TextAlignCenter, TextAlignEnd, TextAlignJustify, TextAlignStart } from "lucide-react";
import { Button, Popover, PopoverContent, PopoverTrigger, ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit";
import type { NodeStyles } from "../types";

type Props = {
    textAlign: NodeStyles["textAlign"];
};

const popoverSideOffset = 14;

const availableTextAligns = [
    {
        value: "start",
        Icon: TextAlignStart
    },
    {
        value: "center",
        Icon: TextAlignCenter
    },
    {
        value: "end",
        Icon: TextAlignEnd
    },
    {
        value: "justify",
        Icon: TextAlignJustify
    }
];

export function TextAlignDropdown({ textAlign }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" className="cursor-pointer">
                    <TextAlignStart className="h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-min p-0" sideOffset={popoverSideOffset}>
                <ToggleGroup type="single" variant="outline">
                    {availableTextAligns.map(align => (
                        <ToggleGroupItem key={align.value} value={align.value} className="cursor-pointer" data-state={textAlign === align.value ? "on" : "off"}>
                            <align.Icon className="h-4 w-4" />
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </PopoverContent>
        </Popover>
    );
}
