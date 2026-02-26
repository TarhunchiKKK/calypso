import type { Rect } from "@/shared/lib/geometry";
import type { NodeBase } from "./node.types";

export type RectNode = NodeBase & {
    rect: Rect;
};
