import { NodesMapper } from "@/features/board-editor/view-model/lib/nodes-mapper.lib";
import { NodeImpl } from "@/features/board-editor/nodes/variants/base";
import { EditingViewState } from "./view-state";
import React from "react";
import { AnyNode } from "@/features/board-editor/nodes/compose/types";

export class EditingNodesMapper extends NodesMapper {
    private constructor(
        inputNodes: AnyNode[],
        private viewState: EditingViewState
    ) {
        super(inputNodes);
    }

    public static from(nodes: AnyNode[], viewState: EditingViewState) {
        return new EditingNodesMapper(nodes, viewState);
    }

    public applyHandlers(
        endEditingHandler: (node: NodeImpl<AnyNode>) => void,
        clickHandler: (e: React.MouseEvent) => void
    ) {
        this.nodes = this.nodes.map(node => {
            if ((this.viewState.selectedNodeId = node.id)) {
                return node.clone().select().setEditing().setHandler("onEditingEnd", endEditingHandler);
            }

            return node.setHandler("onClick", clickHandler);
        });

        return this;
    }
}
