import { NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import type { NodeBase } from "@repo/boards-common";
import type { Id, Offset } from "@repo/common";

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
                return NodeDecoratorsFactory.draggable(NodeDecoratorsFactory.selectable(node), this.offset);
            }

            return node;
        });
    }
}
