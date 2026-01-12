import { NodeBase, NodesMapper, NodeWrapper } from "@/features/board-editor/core";
import { ResizingViewState } from "./view-state";
import { Rect } from "@/features/board-editor/core";
import { NodesFactory } from "@/features/board-editor/nodes";

export class ResizingNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new ResizingNodesMapper(nodes);
    }

    public map(viewState: ResizingViewState, newSize?: Rect) {
        this.nodes = this.nodes.map(node => {
            if (viewState.nodeId === node.id) {
                const selectedNode = newSize ? NodesFactory.select(node.setRect(newSize)) : NodesFactory.select(node);

                return NodesFactory.resizable(selectedNode);
            }

            return node;

            // DELETE: type casting
        }) as NodeWrapper[];

        return this;
    }
}
