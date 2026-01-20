import { SquareRoundCorner } from "lucide-react";
import type { WithNull } from "@/shared/lib/typescript";
import { Wrapper } from "@/shared/ui";
import type { Point } from "../../../core";
import type { NodeStyles } from "../types";
import { ColorsDropdown } from "./colors-dropdown.component";
import { FontFamilyDropdown } from "./font-family-dropdown.component";
import { FontSizeInput } from "./font-size-input.component";
import { FontStyleDropdown } from "./font-style-dropdown.component";
import { TextAlignDropdown } from "./text-align-dropdown.component";

type Props = WithNull<NodeStyles> & {
    point: Point;
};

export function StylesBar({ point: _ }: Props) {
    return (
        <Wrapper className="flex flex-row justify-between items-center gap-4">
            <FontFamilyDropdown value="fantasy" />

            <FontStyleDropdown fontWeight={"bold"} fontStyle={"italic"} textDecoration={"underline"} />

            <FontSizeInput value={2} />

            <TextAlignDropdown value="center" />

            <ColorsDropdown value="#111111" renderItem={color => <div className="h-6 w-6 rounded-full" style={{ backgroundColor: color }} />} />

            <ColorsDropdown
                value="#111111"
                renderItem={color => (
                    <span className="h-6 w-6 rounded-full" style={{ color: color, fontSize: 18 }}>
                        A
                    </span>
                )}
            />

            <ColorsDropdown value="#111111" renderItem={color => <SquareRoundCorner style={{ color: color }} />} />
        </Wrapper>
    );
}
