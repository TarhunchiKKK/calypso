import { EditingViewState } from "./view-state";
import React from "react";
import { NodeDecoratorsFactory } from "@/features/board-editor/nodes";
import { NodeBase, NodesMapper, NodeWrapper } from "@/features/board-editor/core";

export class EditingNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new EditingNodesMapper(nodes);
    }

    public map(
        viewState: EditingViewState,
        endEditingHandler: (node: NodeBase) => void,
        clickHandler: (e: React.MouseEvent) => void
    ) {
        this.nodes = this.nodes.map(node => {
            if ((viewState.selectedNodeId = node.id)) {
                return NodeDecoratorsFactory.editable(NodeDecoratorsFactory.select(node.clone()), endEditingHandler);
            }

            return node.setHandler("onClick", clickHandler);

            // DELETE: type casting
        }) as NodeWrapper[];

        return this;
    }
}
