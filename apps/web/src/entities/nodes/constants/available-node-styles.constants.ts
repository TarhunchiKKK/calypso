import type { NodeStyles } from "@repo/boards";

export const AvailableFontFamilies: NodeStyles["fontFamily"][] = ["sans-serif", "fantasy", "math", "monospace"] as const;

export const AvailableFontSizes: NodeStyles["fontSize"][] = [4, 8, 12, 18, 24, 32, 48] as const;

export const AvailableColors = [
    "#FF3B30",
    "#FF8904",
    "#FFDF20",
    "#00A63E",
    "#51A2FF",
    "#5856D6",
    "#C800DE",
    "#FFA2A2",
    "#D1D5DC",
    "#A2845E",
    "#62748E",
    "#5EE9B5",
    "#F0B100",
    "#C27AFF",
    "#000000",
    "#005F78"
];

export const AvailableBorderRadiuses: NodeStyles["borderRadius"][] = [0, 4, 8, 16, 24, 9999];

export const AvailableLineWidths: NodeStyles["lineWidth"][] = [2, 4, 8, 12, 16, 20];
