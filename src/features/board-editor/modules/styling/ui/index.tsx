import type { WithNull } from "@/shared/lib/typescript";
import type { Point } from "../../../core";
import type { NodeStyles } from "../types";
import { FontFamilyDropdown } from "./font-family-dropdown.component";
import { FontSizeInput } from "./font-size-input.component";
import { FontStyleDropdown } from "./font-style-dropdown.component";
import { TextAlignDropdown } from "./text-align-dropdown.component";

type Props = WithNull<NodeStyles> & {
    point: Point;
};

export function StylesBar({ point: _ }: Props) {
    return (
        <div className="px-2 py-1 rounded-sm flex flex-row justify-between items-center gap-4">
            <FontFamilyDropdown fontFamily="fantasy" />

            <FontStyleDropdown fontWeight={"bold"} fontStyle={"italic"} textDecoration={"underline"} />

            <FontSizeInput value={2} />

            <TextAlignDropdown textAlign="center" />
        </div>
    );
}
