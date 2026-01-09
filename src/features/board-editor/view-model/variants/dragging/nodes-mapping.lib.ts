import { DraggingViewState } from "./view-state";
import { AnyNode } from "@/features/board-editor/nodes";
import { Geometry, NodesMapper, Offset } from "@/features/board-editor/core";

export class DraggingNodesMapper extends NodesMapper {
    private constructor(
        inputNodes: AnyNode[],
        private viewState: DraggingViewState
    ) {
        super(inputNodes);
    }

    public static from(nodes: AnyNode[], viewState: DraggingViewState) {
        return new DraggingNodesMapper(nodes, viewState);
    }

    public applyOffset(offset?: Offset) {
        this.nodes = this.nodes.map(node => {
            if (this.viewState.selectedIds.has(node.id)) {
                return node.clone().select().moveTo(Geometry.applyOffset(node.rect(), offset));
            }

            return node;
        });

        return this;
    }
}
