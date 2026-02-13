import type { NodeStyles } from "@repo/common";
import { TextAlignCenter, TextAlignEnd, TextAlignJustify, TextAlignStart } from "lucide-react";
import type { DropdownItem } from "@/shared/ui/dropdown";

export const PopoverSideOffset = 14;

export const Colors = [
    "#FF3B30",
    "#FF9500",
    "#FFCC00",
    "#34C759",
    "#007AFF",
    "#5856D6",
    "#AF52DE",
    "#FF2D55",
    "#8E8E93",
    "#A2845E",
    "#5AC8FA",
    "#4CD964",
    "#FFD60A",
    "#BF5AF2",
    "#64D2FF",
    "#32D74B"
];

export const Fonts: DropdownItem<NodeStyles["fontFamily"]>[] = [
    {
        label: "Sans Serif",
        value: "sans-serif"
    },
    {
        label: "Fantasy",
        value: "fantasy"
    },
    {
        label: "Math",
        value: "math"
    },
    {
        label: "Monospace",
        value: "monospace"
    }
];

export const FontSizes: DropdownItem<NodeStyles["fontSize"]>[] = [
    {
        label: 4,
        value: 4
    },
    {
        label: 8,
        value: 8
    },

    {
        label: 12,
        value: 12
    },

    {
        label: 18,
        value: 18
    },
    {
        label: 24,
        value: 24
    },
    {
        label: 32,
        value: 32
    },
    {
        label: 48,
        value: 48
    }
];

export const TextAligns: DropdownItem<NodeStyles["textAlign"]>[] = [
    {
        value: "left",
        label: <TextAlignStart />
    },
    {
        value: "center",
        label: <TextAlignCenter />
    },
    {
        value: "right",
        label: <TextAlignEnd />
    },
    {
        value: "justify",
        label: <TextAlignJustify />
    }
];

export const BorderRadiuses: DropdownItem<NodeStyles["borderRadius"]>[] = [
    {
        label: "none",
        value: 0
    },
    {
        label: "4px",
        value: 4
    },
    {
        label: "8px",
        value: 8
    },
    {
        label: "16px",
        value: 16
    },
    {
        label: "24px",
        value: 24
    },
    {
        label: "Full",
        value: 9999
    }
];

export const BorderStyles: DropdownItem<Required<NodeStyles>["borderStyle"]>[] = [
    {
        label: "None",
        value: "none"
    },
    {
        label: "Solid",
        value: "solid"
    },
    {
        label: "Dotted",
        value: "dotted"
    },
    {
        label: "Dashed",
        value: "dashed"
    }
];
