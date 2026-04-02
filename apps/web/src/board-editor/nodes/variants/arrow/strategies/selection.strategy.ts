import type { ArrowNode } from "@repo/boards-common";
import type { Decoratable } from "@/board-editor/core";
import { NodeSelectionStrategy } from "@/board-editor/modules/selection";

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
                // REFACTOR: move this.color to constant
                lineColor: "oklch(62.3% 0.214 259.815)"
            }
        };
    }
}
