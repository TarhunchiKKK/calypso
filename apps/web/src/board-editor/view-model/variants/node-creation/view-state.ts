import type { NodeBase, ShapeVariants } from "@repo/boards-common";
import type { Point } from "@repo/common";
import type { ViewModelParams } from "../../types";

export type NodeCreationPayload =
    | { type: "sticker" }
    | { type: "arrow" }
    | { type: "text" }
    | { type: "shape"; variant: ShapeVariants }
    | { type: "media"; url: string };

export type NodeCreationViewState = {
    type: "node-creation";

    payload: NodeCreationPayload;

    createNode: (clickPoint: Point, viewState: NodeCreationViewState) => NodeBase;

    afterCreate?: (node: NodeBase, params: ViewModelParams) => void;
};
