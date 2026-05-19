import type { ArrowNode } from "@repo/boards";
import type { Decoratable } from "@/board-editor/core";
import { LOCKED_COLOR, NodeLockingStrategy } from "@/board-editor/modules/locking";

export class ArrowNodeLockingStrategy extends NodeLockingStrategy {
    public override ui(node: Decoratable<ArrowNode>) {
        this.updateNodeStyles(node);

        return null;
    }

    private updateNodeStyles(node: Decoratable<ArrowNode>) {
        node.data = {
            ...node.data,
            styles: {
                ...node.data.styles,
                lineColor: LOCKED_COLOR
            }
        };
    }
}
