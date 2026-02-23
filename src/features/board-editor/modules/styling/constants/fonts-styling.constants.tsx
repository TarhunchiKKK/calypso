import type { NodeStyles } from "@/features/board-editor/core";
import type { DropdownItem } from "@/shared/ui";

export const FontFamilies: DropdownItem<NodeStyles["fontFamily"]>[] = [
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
