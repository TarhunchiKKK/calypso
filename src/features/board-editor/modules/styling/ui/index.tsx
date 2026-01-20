import type { WithNull } from "@/shared/lib/typescript";
import type { Point } from "../../../core";
import type { NodeStyles } from "../types";
import { FontStyleDropdown } from "./font-style-dropdown.component";

type Props = WithNull<NodeStyles> & {
    point: Point;
};

export function StylesBar({ point, ...styles }: Props) {
    return <FontStyleDropdown fontWeight={"bold"} fontStyle={"italic"} textDecoration={"underline"} />;
}
