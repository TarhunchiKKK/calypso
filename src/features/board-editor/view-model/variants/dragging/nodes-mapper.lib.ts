import { Geometry, Offset } from "@/features/board-editor/lib/geometry";
import { NodesMapper } from "@/features/board-editor/view-model/lib/nodes-mapper.lib";
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
                return node.clone().select().moveTo(Geometry.applyOffset(node.rect(), offset));
            }

            return node;
        });

        return this;
    }
}
