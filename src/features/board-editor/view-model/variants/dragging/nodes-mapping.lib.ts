import { DraggingViewState } from "./view-state";
import { AnyNode, NodesFactory } from "@/features/board-editor/nodes";
import { Geometry, NodesMapper, NodeWrapper, Offset } from "@/features/board-editor/core";

export class DraggingNodesMapper extends NodesMapper {
    public static from(nodes: AnyNode[]) {
        return new DraggingNodesMapper(nodes);
    }

    public map(viewState: DraggingViewState, offset?: Offset) {
        this.nodes = this.nodes.map(node => {
            if (viewState.selectedIds.has(node.id)) {
                return NodesFactory.select(node.clone().moveTo(Geometry.applyOffset(node.rect(), offset)));
            }

            return node;

            // DELETE: type casting
        }) as NodeWrapper[];

        return this;
    }
}
