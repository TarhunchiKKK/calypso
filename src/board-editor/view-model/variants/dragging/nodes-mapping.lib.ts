import { NodesMapper, type NodeWrapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import type { NodeBase } from "@/entities/nodes";
import type { Offset } from "@/shared/lib/geometry";
import type { DraggingViewState } from "./view-state";

export class DraggingNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new DraggingNodesMapper(nodes);
    }

    public map(viewState: DraggingViewState, offset?: Offset) {
        this.nodes = this.nodes.map(node => {
            if (viewState.selectedIds.has(node.id)) {
                return NodeDecoratorsFactory.draggable(NodeDecoratorsFactory.select(node), offset);
            }

            return node;

            // DELETE: type casting
        }) as NodeWrapper[];

        return this;
    }
}
