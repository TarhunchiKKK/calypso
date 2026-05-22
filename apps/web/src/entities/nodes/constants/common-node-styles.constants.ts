import type { NodeStyles } from "@repo/boards";

const AvailableColors = [
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

export const CommonNodeStyles = {
    textAlign: ["left", "center", "right", "justify"] satisfies NodeStyles["textAlign"][],
    borderStyle: ["none", "solid", "dotted", "dashed"] satisfies NodeStyles["borderStyle"][],
    borderColor: AvailableColors,
    fontFamily: ["sans-serif", "fantasy", "math", "monospace"] satisfies NodeStyles["fontFamily"][],
    textColor: AvailableColors,
    backgroundColor: AvailableColors,
    lineColor: AvailableColors,
    angleType: ["corner", "triangle", "triangle-filled", "kite", "kite-filled"] satisfies NodeStyles["angleType"][],
    lineType: ["solid", "dotted", "dashed"] satisfies NodeStyles["lineType"][]
} satisfies Partial<Record<keyof NodeStyles, unknown>>;
