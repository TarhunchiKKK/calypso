import type { CSSProperties } from "react";

export type NodeStyles = Pick<
    CSSProperties,
    "fontFamily" | "fontSize" | "fontStyle" | "backgroundColor" | "textAlign" | "color" | "borderRadius" | "borderColor" | "borderStyle" | "borderWidth"
>;
