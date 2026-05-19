import type { ArrowNode } from "@repo/boards";
import type { Decoratable } from "@/board-editor/core";
import { NodeSelectionStrategy, SELECTION_COLOR } from "@/board-editor/modules/selection";

export class ArrowSelectionStrategy extends NodeSelectionStrategy {
    public override ui(node: Decoratable<ArrowNode>) {
        this.updateNodeStyles(node);

        return null;
    }

    private updateNodeStyles(node: Decoratable<ArrowNode>) {
        node.data = {
            ...node.data,
            styles: {
                ...node.data.styles,
                lineColor: SELECTION_COLOR
            }
        };
    }
}
