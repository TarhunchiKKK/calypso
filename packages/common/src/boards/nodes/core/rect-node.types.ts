import type { Rect } from "shared/geometry.types";
import type { CreateNodeBaseDto, NodeBase, UpdateNodeBaseDto } from "./node-base.types";

export type RectNode = NodeBase & {
    rect: Rect;
};

export type CreateRectNodeDto = CreateNodeBaseDto & Pick<RectNode, "rect">;

export type UpdateRectNodeDto = UpdateNodeBaseDto & Pick<RectNode, "rect">;
