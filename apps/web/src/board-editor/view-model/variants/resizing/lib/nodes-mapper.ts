import { NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import type { NodeBase } from "@/entities/nodes";
import type { Rect } from "@/shared/lib/geometry";

export class ResizingNodesMapper extends NodesMapper {
    private nodeId!: string;

    private newSize?: Rect = undefined;

    public static from(nodes: NodeBase[]) {
        return new ResizingNodesMapper(nodes);
    }

    public setNodeId(nodeId: string) {
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
                const selectedNode = NodeDecoratorsFactory.select(node);

                if (!this.newSize) {
                    return selectedNode;
                }

                return NodeDecoratorsFactory.resizable(selectedNode, this.newSize);
            }

            return node;
        });
    }
}
