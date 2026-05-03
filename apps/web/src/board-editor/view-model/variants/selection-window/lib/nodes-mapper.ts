import type { Id } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";

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

    public static create() {
        return new SelectionWindowNodesMapper();
    }

    public override map() {
        return this.wrapNodes().map(wrapper => {
            if (this.selectedIds.has(wrapper.id) || this.selectionWIndowIds.has(wrapper.id)) {
                return NodeDecoratorsFactory.selection(wrapper);
            }

            return wrapper;
        });
    }
}
