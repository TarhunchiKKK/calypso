import type { NodeStyles } from "./node-styles.types";

export type NodeTypes = "sticker" | "text" | "shape";

export type NodeBase = {
    id: string;

    type: NodeTypes;

    boardId: string;

    locked: boolean;

    styles: NodeStyles;
};

export type CreateNodeBaseDto = NodeBase;

export type UpdateNodeBaseDto = NodeBase;
