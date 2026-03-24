import type { Id } from "../../../shared/db.types";
import type { NodeStyles } from "./node-styles.types";

export type NodeTypes = "sticker" | "text" | "shape";

export type NodeBase = {
    id: Id;

    type: NodeTypes;

    boardId: Id;

    locked: boolean;

    styles: NodeStyles;
};

export type CreateNodeBaseDto = NodeBase;

export type UpdateNodeBaseDto = NodeBase;
