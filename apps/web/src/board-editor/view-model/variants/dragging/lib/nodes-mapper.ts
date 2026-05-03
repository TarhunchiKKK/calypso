import type { NodeBase } from "@repo/boards-common";
import type { Id, Offset } from "@repo/common";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/lib/decoratable-node.builder";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";

export class DraggingNodesMapper {
    private nodes: NodeBase[] = [];

    private selectedIds!: Set<Id>;

    private offset?: Offset;

    public static create() {
        return new DraggingNodesMapper();
    }

    private getNodesWithOffset() {
        const nodesToDrag = this.nodes
            .filter(node => this.selectedIds.has(node.id))
            .map(node => NodeWrappersFactory.wrap(this.nodes, node))
            .map(wrapper => DecoratableNodeBuilder.from(wrapper).dragging(this.offset).build().data);

        const otherNodes = this.nodes.filter(node => !this.selectedIds.has(node.id));

        return [...nodesToDrag, ...otherNodes];
    }

    public setNodes(nodes: NodeBase[]) {
        this.nodes = nodes;
        return this;
    }

    public setSelectedIds(selectedIds: Set<Id>) {
        this.selectedIds = selectedIds;
        return this;
    }

    public setOffset(offset?: Offset) {
        this.offset = offset;
        return this;
    }

    public map() {
        return this.getNodesWithOffset()
            .map(node => NodeWrappersFactory.wrap(this.nodes, node))
            .map(node => {
                if (this.selectedIds.has(node.id)) {
                    return DecoratableNodeBuilder.from(node).selection().dragging().build();
                }

                return node;
            });
    }
}
