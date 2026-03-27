import { NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import type { Boards, Id } from "@repo/common";

export class NodesContextMenuNodesMapper extends NodesMapper {
    private selectedIds!: Set<Id>;

    public static from(nodes: Boards.NodeBase[]) {
        return new NodesContextMenuNodesMapper(nodes);
    }

    public setSelectedIds(selectedIds: Set<Id>) {
        this.selectedIds = selectedIds;
        return this;
    }

    public override map() {
        return this.nodes.map(node => (this.selectedIds.has(node.id) ? NodeDecoratorsFactory.select(node) : node));
    }
}
