import type { ArrowNode } from "@repo/boards";
import type { Decoratable } from "@/board-editor/core";
import { LOCKED_COLOR, NodeLockingStrategy } from "@/board-editor/modules/locking";

export class ArrowNodeLockingStrategy extends NodeLockingStrategy {
    public override ui(node: Decoratable<ArrowNode>) {
 
        node.wrapper.setUiSetting("color", LOCKED_COLOR)

        return null;
    }

  
}
