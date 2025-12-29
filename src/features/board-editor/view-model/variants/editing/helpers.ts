import { NodesMapper } from "@/features/board-editor/lib/nodes-mapping";
import { NodeImpl } from "@/features/board-editor/nodes/variants/base";
import { EditingViewState } from "./view-state";
import React from "react";

export class EditingNodesMapper extends NodesMapper {
    private constructor(
        nodes: NodeImpl[],
        private viewState: EditingViewState
    ) {
        super(nodes);
    }

    public static from(nodes: NodeImpl[], viewState: EditingViewState) {
        return new EditingNodesMapper(nodes, viewState);
    }

    public applyHandlers(endEditingHandler: (node: NodeImpl) => void, clickHandler: (e: React.MouseEvent) => void) {
        this.nodes = this.nodes.map(node => {
            if ((this.viewState.selectedNodeId = node.id)) {
                return node.clone().select().setEditing().setHandler("onEditingEnd", endEditingHandler);
            }

            return node.setHandler("onClick", clickHandler);
        });

        return this;
    }
}
