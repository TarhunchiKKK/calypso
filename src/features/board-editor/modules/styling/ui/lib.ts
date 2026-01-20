import { TextAlignCenter, TextAlignEnd, TextAlignJustify, TextAlignStart } from "lucide-react";
import type { NodeStyles } from "../types";

export type DropdownItem<Key extends keyof NodeStyles> = {
    label: string | number;

    value: NodeStyles[Key];
};

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

export const Fonts: DropdownItem<"fontFamily">[] = [
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

export const FontSizes: DropdownItem<"fontSize">[] = [
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

export const TextAligns = [
    {
        value: "start",
        Icon: TextAlignStart
    },
    {
        value: "center",
        Icon: TextAlignCenter
    },
    {
        value: "end",
        Icon: TextAlignEnd
    },
    {
        value: "justify",
        Icon: TextAlignJustify
    }
];
