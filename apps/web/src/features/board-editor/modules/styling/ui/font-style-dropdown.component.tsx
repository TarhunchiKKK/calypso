import { Bold, Italic, Underline } from "lucide-react";
import { Button, Popover, PopoverContent, PopoverTrigger, ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit";
import { PopoverSideOffset } from "../constants";

// TODO: implement this component
// QUESTION: how to define what was the previous state of all toggles
export function FontStyleDropdown() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" className="cursor-pointer">
                    <Bold className="h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-min p-0" sideOffset={PopoverSideOffset}>
                <ToggleGroup type="multiple" variant="outline">
                    <ToggleGroupItem value="bold" className="cursor-pointer">
                        <Bold className="h-4 w-4" />
                    </ToggleGroupItem>

                    <ToggleGroupItem value="italic" className="cursor-pointer">
                        <Italic className="h-4 w-4" />
                    </ToggleGroupItem>

                    <ToggleGroupItem value="underline" className="cursor-pointer">
                        <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </PopoverContent>
        </Popover>
    );
}
