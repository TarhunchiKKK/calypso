import { NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import type { NodeBase } from "@/entities/nodes";

export class NodesContextMenuNodesMapper extends NodesMapper {
    private selectedIds!: Set<string>;

    public static from(nodes: NodeBase[]) {
        return new NodesContextMenuNodesMapper(nodes);
    }

    public setSelectedIds(selectedIds: Set<string>) {
        this.selectedIds = selectedIds;
        return this;
    }

    public override map() {
        return this.nodes.map(node => (this.selectedIds.has(node.id) ? NodeDecoratorsFactory.select(node) : node));
    }
}
