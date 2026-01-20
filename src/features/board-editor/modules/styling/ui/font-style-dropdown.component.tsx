import { Bold, Italic, Underline } from "lucide-react";
import type { WithNull } from "@/shared/lib/typescript";
import { Button, Popover, PopoverContent, PopoverTrigger, ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit";
import type { NodeStyles } from "../types";
import { PopoverSideOffset } from "./constants";

type Props = Pick<WithNull<Required<NodeStyles>>, "fontWeight" | "fontStyle" | "textDecoration">;

export function FontStyleDropdown({ fontWeight, fontStyle, textDecoration }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" className="cursor-pointer">
                    <Bold className="h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-min p-0" sideOffset={PopoverSideOffset}>
                <ToggleGroup type="multiple" variant="outline">
                    <ToggleGroupItem value="bold" className="cursor-pointer" data-state={fontWeight === "bold" ? "on" : "off"}>
                        <Bold className="h-4 w-4" />
                    </ToggleGroupItem>

                    <ToggleGroupItem value="italic" className="cursor-pointer" data-state={fontStyle === "italic" ? "on" : "off"}>
                        <Italic className="h-4 w-4" />
                    </ToggleGroupItem>

                    <ToggleGroupItem value="underline" className="cursor-pointer" data-state={textDecoration === "underline" ? "on" : "off"}>
                        <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </PopoverContent>
        </Popover>
    );
}
