import type { DrawingNode } from "@lib/boards";
import type { Decoratable } from "@/board-editor/core";
import { LOCKED_COLOR, NodeLockingStrategy } from "@/board-editor/modules/locking";

export class DrawingNodeLockingStrategy extends NodeLockingStrategy {
    public override ui(node: Decoratable<DrawingNode>) {
        node.wrapper.setUiSetting("color", LOCKED_COLOR);

        return null;
    }
}
