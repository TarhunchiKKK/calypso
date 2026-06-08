import type { RectNode } from "@lib/boards";
import type { Rect } from "@lib/common";
import type { Decoratable } from "@/board-editor/core";
import { NodeResizingStrategy } from "@/board-editor/modules/resizing";

export class RectNodeResizingStrategy extends NodeResizingStrategy {
    public override updateNodeSizes(node: Decoratable<RectNode>, size: Rect) {
        node.data = { ...node.data, rect: size };
    }
}
