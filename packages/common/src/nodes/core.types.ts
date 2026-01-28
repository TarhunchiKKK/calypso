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
