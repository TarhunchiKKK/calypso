import type { Id } from "../../shared/db.types";
import type { Rect } from "../../shared/geometry.types";

export type NodeTypes = "sticker" | "text" | "shape" | "arrow";

export type NodeBase = {
    id: Id;

    type: NodeTypes;

    locked: boolean;

    styles: Record<string, unknown>;
};

export type NodeStyles = {
    fontFamily: string;

    fontSize: number;

    backgroundColor: string;

    textColor: string;

    borderStyle: "none" | "solid" | "dotted" | "dashed";

    borderColor: string;

    borderRadius: number;

    textAlign: "left" | "center" | "right" | "justify";

    lineWidth: number;

    lineColor: string;

    lineType: "solid" | "dashed" | "dotted";

    angleType: "corner" | "triangle" | "triangle-filled" | "kite" | "kite-filled";
};

export type RectNode = NodeBase & {
    rect: Rect;
};
