import type { Id } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";

export class NodesContextMenuNodesMapper extends NodesMapper {
    private selectedIds!: Set<Id>;

    public static create() {
        return new NodesContextMenuNodesMapper();
    }

    public setSelectedIds(selectedIds: Set<Id>) {
        this.selectedIds = selectedIds;
        return this;
    }

    public override map() {
        return this.wrapNodes().map((wrapper) => {
            if (this.selectedIds.has(wrapper.id)) {
                return NodeDecoratorsFactory.selection(wrapper);
            }

            return wrapper;
        });
    }
}
