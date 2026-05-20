import type { NodeStyles } from "@repo/boards";
import { ALargeSmall, CaseSensitive } from "lucide-react";
import { AvailableFontFamilies, AvailableFontSizes } from "@/entities/nodes/constants/available-node-styles.constants";
import { capitalize } from "@/shared/lib/string";
import type { DropdownItem } from "@/shared/ui";

export function formatFontFamilyName(fontFamily: string) {
    return fontFamily.split("-").map(capitalize).join(" ");
}

export const FontFamilyPlaceholder = <CaseSensitive className="dark:text-white" />;

export const FontSizePlaceholder = <ALargeSmall className="dark:text-white" />;

export const FontFamilies: DropdownItem<NodeStyles["fontFamily"]>[] = AvailableFontFamilies.map((fontFamily) => ({
    label: <span style={{ fontFamily }}>{formatFontFamilyName(fontFamily)}</span>,
    value: fontFamily
}));

export const FontSizes: DropdownItem<NodeStyles["fontSize"]>[] = AvailableFontSizes.map((fontSize) => ({
    label: <span style={{ fontSize }}>{`${fontSize}px`}</span>,
    value: fontSize
}));
