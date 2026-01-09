import { EditingViewState } from "./view-state";
import React from "react";
import { AnyNode } from "@/features/board-editor/nodes";
import { NodesMapper } from "@/features/board-editor/core";

export class EditingNodesMapper extends NodesMapper {
    public static from(nodes: AnyNode[]) {
        return new EditingNodesMapper(nodes);
    }

    public map(
        viewState: EditingViewState,
        endEditingHandler: (node: AnyNode) => void,
        clickHandler: (e: React.MouseEvent) => void
    ) {
        this.nodes = this.nodes.map(node => {
            if ((viewState.selectedNodeId = node.id)) {
                return node.clone().select().setEditing().setHandler("onEditingEnd", endEditingHandler);
            }

            return node.setHandler("onClick", clickHandler);
        });

        return this;
    }
}
