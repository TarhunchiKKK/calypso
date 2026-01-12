import { DraggingViewState } from "./view-state";
import { NodeDecoratorsFactory } from "@/features/board-editor/nodes";
import { Geometry, NodeBase, NodesMapper, NodeWrapper, Offset } from "@/features/board-editor/core";

export class DraggingNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new DraggingNodesMapper(nodes);
    }

    public map(viewState: DraggingViewState, offset?: Offset) {
        this.nodes = this.nodes.map(node => {
            if (viewState.selectedIds.has(node.id)) {
                return NodeDecoratorsFactory.select(node.clone().moveTo(Geometry.applyOffset(node.rect(), offset)));
            }

            return node;

            // DELETE: type casting
        }) as NodeWrapper[];

        return this;
    }
}
