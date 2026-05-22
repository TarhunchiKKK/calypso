import type { ArrowNode } from "@repo/boards";
import type { Decoratable } from "@/board-editor/core";
import { NodeSelectionStrategy, SELECTION_COLOR } from "@/board-editor/modules/selection";

export class ArrowSelectionStrategy extends NodeSelectionStrategy {
    public override ui(node: Decoratable<ArrowNode>) {
        node.wrapper.setUiSetting("color", SELECTION_COLOR);

        return null;
    }
}
