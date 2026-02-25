import type { Rect } from "@/shared/lib/geometry";
import type { NodeBase } from "./nodes.types";

export type RectNode = NodeBase & {
    rect: Rect;
};
