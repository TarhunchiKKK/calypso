import { NodesMapper } from "@/features/board-editor/core";
import { AnyNode } from "@/features/board-editor/nodes";
import { SelectionWindowViewState } from "./view-state";

export class SelectionWindowNodesMapper extends NodesMapper {
    private constructor(
        inputNodes: AnyNode[],
        private viewState: SelectionWindowViewState
    ) {
        super(inputNodes);
    }

    public static from(nodes: AnyNode[], viewState: SelectionWindowViewState) {
        return new SelectionWindowNodesMapper(nodes, viewState);
    }

    public applySelection(selectionWindowNodeIds: Set<string>) {
        this.nodes = this.nodes.map(node => {
            if (this.viewState.selectedIds.has(node.id) || selectionWindowNodeIds.has(node.id)) {
                return node.clone().select();
            }

            return node;
        });

        return this;
    }
}
