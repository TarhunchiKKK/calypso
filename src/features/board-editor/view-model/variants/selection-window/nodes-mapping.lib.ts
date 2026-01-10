import { NodesMapper } from "@/features/board-editor/core";
import { SelectedNodeDecorator } from "@/features/board-editor/modules/selection";
import { AnyNode } from "@/features/board-editor/nodes";

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

    public static from(nodes: AnyNode[]) {
        return new SelectionWindowNodesMapper(nodes);
    }

    public override get() {
        return this.nodes.map(node => {
            if (this.selectedIds.has(node.id) || this.selectionWIndowIds.has(node.id)) {
                return new SelectedNodeDecorator(node);
            }

            return node;
        });
    }
}
