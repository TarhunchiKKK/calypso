import { NodesMapper } from "@/features/board-editor/core";
import { AnyNode } from "@/features/board-editor/nodes";
import { SelectionWindowViewState } from "./view-state";

export class SelectionWindowNodesMapper extends NodesMapper {
    public static from(nodes: AnyNode[]) {
        return new SelectionWindowNodesMapper(nodes);
    }

    public map(viewState: SelectionWindowViewState, selectionWindowNodeIds: Set<string>) {
        this.nodes = this.nodes.map(node => {
            if (viewState.selectedIds.has(node.id) || selectionWindowNodeIds.has(node.id)) {
                return node.clone().select();
            }

            return node;
        });

        return this;
    }
}
