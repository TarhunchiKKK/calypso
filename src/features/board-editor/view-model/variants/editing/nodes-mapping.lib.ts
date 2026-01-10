import { EditingViewState } from "./view-state";
import React from "react";
import { AnyNode, NodesFactory } from "@/features/board-editor/nodes";
import { NodesMapper, NodeWrapper } from "@/features/board-editor/core";

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
                return NodesFactory.select(node.clone().setEditing().setHandler("onEditingEnd", endEditingHandler));
            }

            return node.setHandler("onClick", clickHandler);

            // DELETE: type casting
        }) as NodeWrapper[];

        return this;
    }
}
