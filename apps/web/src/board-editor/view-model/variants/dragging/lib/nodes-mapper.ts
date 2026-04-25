import type { NodeBase } from "@repo/boards-common";
import type { Id, Offset } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/builders/decoratable-node.builder";

export class DraggingNodesMapper extends NodesMapper {
    private selectedIds!: Set<Id>;

    private offset?: Offset = undefined;

    public static from(nodes: NodeBase[]) {
        return new DraggingNodesMapper(nodes);
    }

    public setSelectedIds(selectedIds: Set<Id>) {
        this.selectedIds = selectedIds;
        return this;
    }

    public setOffset(offset?: Offset) {
        this.offset = offset;
        return this;
    }

    public override map() {
        return this.nodes.map(node => {
            if (this.selectedIds.has(node.id)) {
                return DecoratableNodeBuilder.from(node).selection().dragging(this.offset).build();
            }

            return node;
        });
    }
}
