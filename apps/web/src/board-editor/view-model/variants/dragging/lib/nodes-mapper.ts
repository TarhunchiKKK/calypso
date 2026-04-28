import type { NodeBase } from "@repo/boards-common";
import type { Id, Offset } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/builders/decoratable-node.builder";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/factories/node-wrappers.factory";

export class DraggingNodesMapper extends NodesMapper {
    private selectedIds!: Set<Id>;


    public static from(nodes: NodeBase[], selectedIds: Set<Id>, offset?: Offset) {
        
        
        if (!offset) {
            return new DraggingNodesMapper(nodes);
        }
        
        
        const nodesToDrag = nodes
            .filter(node => selectedIds.has(node.id))
            .map((node) => NodeWrappersFactory.wrap(nodes, node))
            .map(wrapper => DecoratableNodeBuilder.from(wrapper).dragging(offset).build().data);
        
        const otherNodes = nodes.filter(node => !selectedIds.has(node.id));

        return new DraggingNodesMapper([...nodesToDrag, ...otherNodes])

    }

    public setSelectedIds(selectedIds: Set<Id>) {
        this.selectedIds = selectedIds;
        return this;
    }

    public override map() {
        return this.nodes.map(node => {
            if (this.selectedIds.has(node.id)) {
                return DecoratableNodeBuilder.from(node).selection().dragging().build();
            }

            return node;
        });
    }
}
