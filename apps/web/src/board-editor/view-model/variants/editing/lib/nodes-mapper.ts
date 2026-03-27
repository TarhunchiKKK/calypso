import { type NodeHandlers, NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import type { Boards, Id } from "@repo/common";

export class EditingNodesMapper extends NodesMapper {
    private selectedNodeId!: Id;

    private endEditingHandler!: (node: Boards.NodeBase) => void;

    private nodesHandlers!: NodeHandlers;

    public static from(nodes: Boards.NodeBase[]) {
        return new EditingNodesMapper(nodes);
    }

    public setSelectedNodeId(selectedNodeId: Id) {
        this.selectedNodeId = selectedNodeId;
        return this;
    }

    public setEndEditingHandler(endEditingHandler: (node: Boards.NodeBase) => void) {
        this.endEditingHandler = endEditingHandler;
        return this;
    }

    public setNodesHandlers(nodesHandlers: NodeHandlers) {
        this.nodesHandlers = nodesHandlers;
        return this;
    }

    public override map() {
        return this.nodes.map(node => {
            if (this.selectedNodeId === node.id) {
                return NodeDecoratorsFactory.editable(
                    NodeDecoratorsFactory.select(node.clone()),
                    this.endEditingHandler
                );
            }

            return node.setHandlers(this.nodesHandlers);
        });
    }
}
