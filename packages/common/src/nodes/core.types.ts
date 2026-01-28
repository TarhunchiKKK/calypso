import type { CSSProperties } from "react";
import type { Rect } from "shared/geometry";

export type NodeTypes = "sticker" | "text";

export type NodeBase = {
    id: string;

    type: NodeTypes;

    blocked: boolean;
};

export type RectNode = NodeBase & {
    rect: Rect;
};

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
