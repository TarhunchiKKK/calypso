import type { DrawingNode } from "@repo/boards";
import type { Decoratable } from "@/board-editor/core";
import { LOCKED_COLOR, NodeLockingStrategy } from "@/board-editor/modules/locking";

export class DrawingNodeLockingStrategy extends NodeLockingStrategy {
    public override ui(node: Decoratable<DrawingNode>) {
        this.updateNodeStyles(node);

        return null;
    }

    private updateNodeStyles(node: Decoratable<DrawingNode>) {
        node.data = {
            ...node.data,
            styles: {
                ...node.data.styles,
                lineColor: LOCKED_COLOR
            }
        };
    }
}
