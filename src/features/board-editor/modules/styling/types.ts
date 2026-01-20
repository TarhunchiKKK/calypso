import type { CSSProperties } from "react";

export type NodeStyles = Pick<
    CSSProperties,
    | "fontFamily"
    | "fontSize"
    | "fontStyle"
    | "fontWeight"
    | "textDecoration"
    | "backgroundColor"
    | "textAlign"
    | "color"
    | "borderRadius"
    | "borderColor"
    | "borderStyle"
    | "borderWidth"
>;
