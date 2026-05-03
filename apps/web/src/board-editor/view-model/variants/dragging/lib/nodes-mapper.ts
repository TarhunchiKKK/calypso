import type { Id, Offset } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/lib/decoratable-node.builder";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";

export class DraggingNodesMapper extends NodesMapper {
    private selectedIds!: Set<Id>;

    private offset?: Offset;

    public static create() {
        return new DraggingNodesMapper();
    }

    public setSelectedIds(selectedIds: Set<Id>) {
        this.selectedIds = selectedIds;
        return this;
    }

    public setOffset(offset?: Offset) {
        this.offset = offset;
        return this;
    }

    public getNodesWithOffset() {
        const nodesToDrag = this.nodes
            .filter(node => this.selectedIds.has(node.id))
            .map(node => NodeWrappersFactory.wrap(this.nodes, node))
            .map(wrapper => DecoratableNodeBuilder.from(wrapper).dragging(this.offset).build().data);

        const otherNodes = this.nodes.filter(node => !this.selectedIds.has(node.id));

        return [...nodesToDrag, ...otherNodes];
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
