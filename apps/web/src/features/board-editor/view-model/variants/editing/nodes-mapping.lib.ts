import type { NodeBase } from "@repo/common";
import { type NodeHandlers, NodesMapper, type NodeWrapper } from "@/features/board-editor/core";
import { NodeDecoratorsFactory } from "@/features/board-editor/nodes";
import type { EditingViewState } from "./view-state";

export class EditingNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new EditingNodesMapper(nodes);
    }

    public map(viewState: EditingViewState, endEditingHandler: (node: NodeBase) => void, handlers: NodeHandlers) {
        this.nodes = this.nodes.map(node => {
            if (viewState.selectedNodeId === node.id) {
                return NodeDecoratorsFactory.editable(NodeDecoratorsFactory.select(node.clone()), endEditingHandler);
            }

            return node.setHandlers(handlers);

            // DELETE: type casting
        }) as NodeWrapper[];

        return this;
    }
}
