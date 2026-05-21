import type { NodeStyles } from "@repo/boards";
import { ALargeSmall, CaseSensitive } from "lucide-react";
import { capitalize } from "@/shared/lib/string";
import type { DropdownItem } from "@/shared/ui";

export const FontFamilyPlaceholder = <CaseSensitive className="dark:text-white" />;

export const FontSizePlaceholder = <ALargeSmall className="dark:text-white" />;

export function formatFontFamilyName(fontFamily: string) {
    return fontFamily.split("-").map(capitalize).join(" ");
}

export function getFontFamilies(values: NodeStyles["fontFamily"][]): DropdownItem<NodeStyles["fontFamily"]>[] {
    return values.map((value) => ({
        label: <span style={{ fontFamily: value }}>{formatFontFamilyName(value)}</span>,
        value: value
    }));
}

export function getFontSizes(values: NodeStyles["fontSize"][]): DropdownItem<NodeStyles["fontSize"]>[] {
    return values.map((value) => ({
        label: <span style={{ fontSize: value }}>{`${value}px`}</span>,
        value: value
    }));
}
