import type { Id, Rect } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import type { NodeBase } from "@repo/boards-common";

export class ResizingNodesMapper extends NodesMapper {
    private nodeId!: Id;

    private newSize?: Rect = undefined;

    public static from(nodes: NodeBase[]) {
        return new ResizingNodesMapper(nodes);
    }

    public setNodeId(nodeId: Id) {
        this.nodeId = nodeId;
        return this;
    }

    public setNewSize(newSize?: Rect) {
        this.newSize = newSize;
        return this;
    }

    public override map() {
        return this.nodes.map(node => {
            if (this.nodeId === node.id) {
                const selectedNode = NodeDecoratorsFactory.selectable(node);

                if (!this.newSize) {
                    return selectedNode;
                }

                return NodeDecoratorsFactory.resizable(selectedNode, this.newSize);
            }

            return node;
        });
    }
}
