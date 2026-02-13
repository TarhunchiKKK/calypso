import type { NodeBase } from "@repo/common";
import { NodesMapper } from "@/features/board-editor/core";
import { NodeDecoratorsFactory } from "@/features/board-editor/nodes";

export class SelectionWindowNodesMapper extends NodesMapper {
    private selectedIds!: Set<string>;

    private selectionWIndowIds!: Set<string>;

    public setSelectedIds(ids: Set<string>) {
        this.selectedIds = ids;
        return this;
    }

    public setSelectionWindowIds(ids: Set<string>) {
        this.selectionWIndowIds = ids;
        return this;
    }

    public static from(nodes: NodeBase[]) {
        return new SelectionWindowNodesMapper(nodes);
    }

    public override get() {
        return this.nodes.map(node => {
            if (this.selectedIds.has(node.id) || this.selectionWIndowIds.has(node.id)) {
                return NodeDecoratorsFactory.select(node);
            }

            return node;
        });
    }
}
