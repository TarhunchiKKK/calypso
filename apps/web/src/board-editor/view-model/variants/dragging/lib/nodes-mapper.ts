import { NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import type { NodeBase } from "@/entities/nodes";
import type { Offset } from "@/shared/lib/geometry";

export class DraggingNodesMapper extends NodesMapper {
    private selectedIds!: Set<string>;

    private offset?: Offset = undefined;

    public static from(nodes: NodeBase[]) {
        return new DraggingNodesMapper(nodes);
    }

    public setSelectedIds(selectedIds: Set<string>) {
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
                return NodeDecoratorsFactory.draggable(NodeDecoratorsFactory.select(node), this.offset);
            }

            return node;
        });
    }
}
