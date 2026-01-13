import { type NodeBase, NodesMapper, type NodeWrapper } from "@/features/board-editor/core";
import type { ResizingViewState } from "./view-state";
import type { Rect } from "@/features/board-editor/core";
import { NodeDecoratorsFactory } from "@/features/board-editor/nodes";

export class ResizingNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new ResizingNodesMapper(nodes);
    }

    public map(viewState: ResizingViewState, newSize?: Rect) {
        this.nodes = this.nodes.map(node => {
            if (viewState.nodeId === node.id) {
                const selectedNode = NodeDecoratorsFactory.select(node);

                if (!newSize) {
                    return selectedNode;
                }

                return NodeDecoratorsFactory.resizable(selectedNode, newSize);
            }

            return node;

            // DELETE: type casting
        }) as NodeWrapper[];

        return this;
    }
}
