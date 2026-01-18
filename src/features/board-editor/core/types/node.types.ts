import type { Rect } from "../lib/geometry";

export type NodeTypes = "sticker" | "text";

export type NodeBase = {
    id: string;

    type: NodeTypes;

    blocked: boolean;
};

export type RectNode = NodeBase & {
    rect: Rect;
};
