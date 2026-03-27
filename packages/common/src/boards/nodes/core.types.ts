import { Rect } from "../../shared/geometry.types";
import { Id } from "../../shared/db.types";

export type NodeTypes = "sticker" | "text" | "shape"| "arrow";

export type NodeBase = {
    id: Id;

    type: NodeTypes;

    locked: boolean;

    styles: NodeStyles;
};

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

export type RectNode = NodeBase & {
    rect: Rect;
};