import type { NodeStyles } from "@/entities/nodes";
import { AvailableFontFamilies, AvailableFontSizes } from "@/entities/nodes/constants/available-node-styles.constants";
import type { DropdownItem } from "@/shared/ui";
import { formatFontFamilyName } from "../lib/utils";

// FIX: add styled labels
export const FontFamilies: DropdownItem<NodeStyles["fontFamily"]>[] = AvailableFontFamilies.map(fontFamily => ({
    label: formatFontFamilyName(fontFamily),
    value: fontFamily
}));

// FIX: add styled labels
export const FontSizes: DropdownItem<NodeStyles["fontSize"]>[] = AvailableFontSizes.map(fontSize => ({
    label: `${fontSize}px`,
    value: fontSize
}));
