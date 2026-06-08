import type { Id, Offset } from "@lib/common";
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
            .filter((node) => this.selectedIds.has(node.id))
            .map(NodeWrappersFactory.wrap)
            .map((wrapper) => DecoratableNodeBuilder.from(wrapper).dragging(this.offset).build())
            .map((wrapper) => wrapper.data);

        const otherNodes = this.nodes.filter((node) => !this.selectedIds.has(node.id));

        return [...nodesToDrag, ...otherNodes];
    }

    public map() {
        return this.getNodesWithOffset()
            .map(NodeWrappersFactory.wrap)
            .map((wrapper) => {
                if (this.selectedIds.has(wrapper.id)) {
                    return DecoratableNodeBuilder.from(wrapper).selection().dragging().build();
                }

                return wrapper;
            });
    }
}
