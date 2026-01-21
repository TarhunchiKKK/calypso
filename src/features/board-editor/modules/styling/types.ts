import type { CSSProperties } from "react";

export type NodeStyles = Pick<
    Required<CSSProperties>,
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
>;
