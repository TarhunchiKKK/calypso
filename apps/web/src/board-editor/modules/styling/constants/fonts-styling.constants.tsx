import { AvailableFontFamilies, AvailableFontSizes } from "@/entities/nodes/constants/available-node-styles.constants";
import type { DropdownItem } from "@/shared/ui";
import { formatFontFamilyName } from "../lib/utils";
import type { Boards } from "@repo/common";

export const FontFamilies: DropdownItem<Boards.NodeStyles["fontFamily"]>[] = AvailableFontFamilies.map(fontFamily => ({
    label: <span style={{ fontFamily }}>{formatFontFamilyName(fontFamily)}</span>,
    value: fontFamily
}));

export const FontSizes: DropdownItem<Boards.NodeStyles["fontSize"]>[] = AvailableFontSizes.map(fontSize => ({
    label: <span style={{ fontSize }}>{`${fontSize}px`}</span>,
    value: fontSize
}));
