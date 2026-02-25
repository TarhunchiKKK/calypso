import { NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import type { NodeBase } from "@/entities/nodes";

export class SelectionWindowNodesMapper extends NodesMapper {
    private selectedIds!: Set<string>;

    private selectionWIndowIds!: Set<string>;

    public setSelectedIds(ids: Set<string>) {
        this.selectedIds = ids;
        return this;
    }

    public setSelectionWindowIds(selectedIds: Set<string>) {
        this.selectionWIndowIds = selectedIds;
        return this;
    }

    public static from(nodes: NodeBase[]) {
        return new SelectionWindowNodesMapper(nodes);
    }

    public override map() {
        return this.nodes.map(node => {
            if (this.selectedIds.has(node.id) || this.selectionWIndowIds.has(node.id)) {
                return NodeDecoratorsFactory.select(node);
            }

            return node;
        });
    }
}
