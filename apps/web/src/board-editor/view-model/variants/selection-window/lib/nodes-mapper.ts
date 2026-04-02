import { NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import type { NodeBase } from "@repo/boards-common";
import type { Id } from "@repo/common";

export class SelectionWindowNodesMapper extends NodesMapper {
    private selectedIds!: Set<Id>;

    private selectionWIndowIds!: Set<Id>;

    public setSelectedIds(ids: Set<Id>) {
        this.selectedIds = ids;
        return this;
    }

    public setSelectionWindowIds(selectedIds: Set<Id>) {
        this.selectionWIndowIds = selectedIds;
        return this;
    }

    public static from(nodes: NodeBase[]) {
        return new SelectionWindowNodesMapper(nodes);
    }

    public override map() {
        return this.nodes.map(node => {
            if (this.selectedIds.has(node.id) || this.selectionWIndowIds.has(node.id)) {
                return NodeDecoratorsFactory.selectable(node);
            }

            return node;
        });
    }
}
