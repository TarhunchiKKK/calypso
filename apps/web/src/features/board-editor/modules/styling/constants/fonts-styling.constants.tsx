import type { NodeStyles } from "@repo/common";
import { ALargeSmall, CaseSensitive } from "lucide-react";
import type { DropdownItem } from "@/shared/ui";

export const FontFamilyPlaceholder = <CaseSensitive className="w-4 h-4 dark:text-white" />;

export const FontSizePlaceholder = <ALargeSmall className="dark:text-white" />;

export const FontFamilies: DropdownItem<NodeStyles["fontFamily"]>[] = [
    {
        label: <span style={{ fontFamily: "sans-serif" }}>Sans Serif</span>,
        value: "sans-serif"
    },
    {
        label: <span style={{ fontFamily: "fantasy" }}>Fantasy</span>,
        value: "fantasy"
    },
    {
        label: <span style={{ fontFamily: "math" }}>Math</span>,
        value: "math"
    },
    {
        label: <span style={{ fontFamily: "monospace" }}>Monospace</span>,
        value: "monospace"
    }
];

export const FontSizes: DropdownItem<NodeStyles["fontSize"]>[] = [14, 16, 18, 20, 22, 24].map(value => ({
    label: <span style={{ fontSize: value, fontStyle: "italic" }}>{value}px</span>,
    value: value
}));
