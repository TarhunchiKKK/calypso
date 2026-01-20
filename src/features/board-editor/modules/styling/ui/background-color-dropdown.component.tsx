import { Button, Popover, PopoverContent, PopoverTrigger, ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit";
import type { NodeStyles } from "../types";

type Props = {
    backgroundColor: NodeStyles["backgroundColor"];
};

const popoverSideOffset = 14;

const colors = [
    "#FF3B30",
    "#FF9500",
    "#FFCC00",
    "#34C759",
    "#007AFF",
    "#5856D6",
    "#AF52DE",
    "#FF2D55",
    "#8E8E93",
    "#A2845E",
    "#5AC8FA",
    "#4CD964",
    "#FFD60A",
    "#BF5AF2",
    "#64D2FF",
    "#32D74B"
];

export function BackgroundColorDropdown({ backgroundColor }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" className="cursor-pointer">
                    <div className="h-6 w-6 rounded-full" style={{ backgroundColor: colors[0] }} />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[192px] p-0" sideOffset={popoverSideOffset}>
                <ToggleGroup type="single" variant="default" className="grid!">
                    <div className="grid grid-cols-4">
                        {colors.map(color => (
                            <ToggleGroupItem key={color} value={color} className="cursor-pointer" data-state={backgroundColor === color ? "on" : "off"}>
                                <div className="h-6 w-6 rounded-full" style={{ background: color }}></div>
                            </ToggleGroupItem>
                        ))}
                    </div>
                </ToggleGroup>
            </PopoverContent>
        </Popover>
    );
}
