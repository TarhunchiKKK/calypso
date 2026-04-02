import type { Id, Rect } from "@repo/common";

export type NodeTypes = "sticker" | "text" | "shape" | "arrow";

export type NodeBase = {
    id: Id;

    type: NodeTypes;

    locked: boolean;

    styles: Record<string, unknown>;
};

export type RectNode = NodeBase & {
    rect: Rect;
};
