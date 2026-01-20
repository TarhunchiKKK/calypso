import { ALargeSmall, Square, SquareDashed, SquareRoundCorner, TextAlignStart, Type } from "lucide-react";
import type { WithNull } from "@/shared/lib/typescript";
import { HorizontalDropdown, NumericDropdown, Wrapper } from "@/shared/ui";
import type { Point } from "../../../core";
import type { NodeStyles } from "../types";
import { ColorsDropdown } from "./colors-dropdown.component";
import { FontFamilyDropdown } from "./font-family-dropdown.component";
import { BorderRadiuses, BorderStyles, FontSizes, PopoverSideOffset, TextAligns } from "./lib";

type Props = WithNull<NodeStyles> & {
    point: Point;
};

export function StylesBar({ point: _ }: Props) {
    return (
        <Wrapper className="flex flex-row justify-between items-center gap-4">
            <FontFamilyDropdown value="fantasy" />

            <NumericDropdown value={14} placeholder={<ALargeSmall className="h-4 w-4" />} items={FontSizes} />

            <HorizontalDropdown value="center" items={TextAligns} placeholder={<TextAlignStart className="h-4 w-4" />} popoverOffset={PopoverSideOffset} />

            <ColorsDropdown value="#111111" renderItem={backgroundColor => <div className="h-6 w-6 rounded-full" style={{ backgroundColor }} />} />

            <ColorsDropdown value="#111111" renderItem={color => <Type style={{ color }} />} />

            <ColorsDropdown value="#111111" renderItem={color => <Square style={{ color }} />} />

            <NumericDropdown value={14} placeholder={<SquareRoundCorner className="h-4 w-4" />} items={BorderRadiuses} />

            <HorizontalDropdown value="dotted" items={BorderStyles} placeholder={<SquareDashed className="h-4 w-4" />} popoverOffset={PopoverSideOffset} />
        </Wrapper>
    );
}
