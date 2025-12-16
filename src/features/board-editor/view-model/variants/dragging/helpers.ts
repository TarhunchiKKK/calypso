import { Geometry, Offset } from "@/features/board-editor/domain/geometry";
import { NodesMapper } from "@/features/board-editor/domain/nodes-mapping";
import { NodeImpl } from "@/features/board-editor/nodes/variants/base";
import { DraggingViewState } from "./view-state";

export class DraggingNodesMapper extends NodesMapper {
    private constructor(
        nodes: NodeImpl[],
        private viewState: DraggingViewState
    ) {
        super(nodes);
    }

    public static from(nodes: NodeImpl[], viewState: DraggingViewState) {
        return new DraggingNodesMapper(nodes, viewState);
    }

    public applyOffset(offset?: Offset) {
        this.nodes = this.nodes.map(node => {
            if (this.viewState.selectedIds.has(node.id)) {
                return node.select().moveTo(Geometry.applyOffset(node.rect(), offset));
            }

            return node;
        });

        return this;
    }
}
