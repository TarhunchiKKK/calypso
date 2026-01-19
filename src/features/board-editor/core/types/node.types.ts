import type { Rect } from "../lib/geometry";
import type { NodeStyles } from "./styling.types";

export type NodeTypes = "sticker" | "text";

export type NodeBase = {
    id: string;

    type: NodeTypes;

    blocked: boolean;

    styles: NodeStyles;
};

export type RectNode = NodeBase & {
    rect: Rect;
};
