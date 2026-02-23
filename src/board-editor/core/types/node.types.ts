import type { Rect } from "@/shared/lib/geometry";

export type NodeTypes = "sticker" | "text";

export type NodeStyles = {
    fontFamily: string;

    fontSize: number;

    backgroundColor: string;

    color: string;

    borderStyle: "none" | "solid" | "dotted" | "dashed";

    borderColor: string;

    borderRadius: number;

    textAlign: "left" | "center" | "right" | "justify";
};

export type NodeBase = {
    id: string;

    type: NodeTypes;

    boardId: string;

    blocked: boolean;

    styles: NodeStyles;
};

export type RectNode = NodeBase & {
    rect: Rect;
};
