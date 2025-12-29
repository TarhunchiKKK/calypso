import { NodesMapper } from "@/features/board-editor/lib/nodes-mapping";
import { NodeImpl } from "@/features/board-editor/nodes/variants/base";
import { SelectionWindowViewState } from "./view-state";

export class SelectionWindowNodesMapper extends NodesMapper {
    private constructor(
        nodes: NodeImpl[],
        private viewState: SelectionWindowViewState
    ) {
        super(nodes);
    }

    public static from(nodes: NodeImpl[], viewState: SelectionWindowViewState) {
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
