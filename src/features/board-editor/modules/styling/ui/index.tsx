import type { WithNull } from "@/shared/lib/typescript";
import type { Point } from "../../../core";
import type { NodeStyles } from "../types";
import { FontFamilyDropdown } from "./font-family-dropdown.component";

type Props = WithNull<NodeStyles> & {
    point: Point;
};

export function StylesBar({ point, ...styles }: Props) {
    return <FontFamilyDropdown fontFamily={styles.fontFamily} />;
}
