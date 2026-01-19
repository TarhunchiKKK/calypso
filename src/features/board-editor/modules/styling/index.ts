import type { NodeStyles } from "../../core";

export const availableStyles: Array<keyof NodeStyles> = [
    "fontSize",
    "fontStyle",
    "backgroundColor",
    "textAlign",
    "color",
    "borderColor",
    "borderStyle",
    "borderRadius",
    "borderWidth"
] as const;
