import { ALargeSmall, Square, SquareRoundCorner, Type } from "lucide-react";
import type { WithNull } from "@/shared/lib/typescript";
import { NumericDropdown, Wrapper } from "@/shared/ui";
import type { Point } from "../../../core";
import type { NodeStyles } from "../types";
import { ColorsDropdown } from "./colors-dropdown.component";
import { FontFamilyDropdown } from "./font-family-dropdown.component";
import { BorderRadiuses, FontSizes } from "./lib";
import { TextAlignDropdown } from "./text-align-dropdown.component";

type Props = WithNull<NodeStyles> & {
    point: Point;
};

export function StylesBar({ point: _ }: Props) {
    return (
        <Wrapper className="flex flex-row justify-between items-center gap-4">
            <FontFamilyDropdown value="fantasy" />

            <NumericDropdown value={14} placeholder={<ALargeSmall className="h-4 w-4" />} items={FontSizes} />

            <TextAlignDropdown value="center" />

            <ColorsDropdown value="#111111" renderItem={color => <div className="h-6 w-6 rounded-full" style={{ backgroundColor: color }} />} />

            <ColorsDropdown value="#111111" renderItem={color => <Type style={{ color: color }} />} />

            <ColorsDropdown value="#111111" renderItem={color => <Square style={{ color: color }} />} />

            <NumericDropdown value={14} placeholder={<SquareRoundCorner className="h-4 w-4" />} items={BorderRadiuses} />
        </Wrapper>
    );
}
