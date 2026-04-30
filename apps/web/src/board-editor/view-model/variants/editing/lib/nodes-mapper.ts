import type { NodeBase } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { type NodeHandlers, NodesMapper } from "@/board-editor/core";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/lib/decoratable-node.builder";

export class EditingNodesMapper extends NodesMapper {
    private selectedNodeId!: Id;

    private endEditingHandler!: (node: NodeBase) => void;

    private nodesHandlers!: NodeHandlers;

    public static from(nodes: NodeBase[]) {
        return new EditingNodesMapper(nodes);
    }

    public setSelectedNodeId(selectedNodeId: Id) {
        this.selectedNodeId = selectedNodeId;
        return this;
    }

    public setEndEditingHandler(endEditingHandler: (node: NodeBase) => void) {
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
                return DecoratableNodeBuilder.from(node).selection().editing(this.endEditingHandler).build();
            }

            return node.setHandlers(this.nodesHandlers);
        });
    }
}
