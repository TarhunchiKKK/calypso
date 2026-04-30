import type { NodeBase } from "@repo/boards-common";
import type { Id, Rect } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";

export class ResizingNodesMapper extends NodesMapper {
    private nodeId!: Id;

    private newSize?: Rect = undefined;

    public static from(nodes: NodeBase[], nodeId: Id, newSize?: Rect) {
        if (!newSize) {
            return new ResizingNodesMapper(nodes);
        }

        const resizedNodes = ResizingNodesMapper.getNodesWithUpdatedSizes(nodes, nodeId, newSize);
        return new ResizingNodesMapper(resizedNodes);
    }

    public static getNodesWithUpdatedSizes(nodes: NodeBase[], nodeId: Id, newSize: Rect) {
        const resizingNode = nodes.find(node => node.id === nodeId);

        if (!resizingNode) {
            throw new Error(`Resizing node not found (id='${nodeId})'`);
        }

        const resizedNode = NodeDecoratorsFactory.resizing(NodeWrappersFactory.wrap(nodes, resizingNode), newSize).data;

        return [...nodes.filter(node => node.id !== nodeId), resizedNode];
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
                const selectedNode = NodeDecoratorsFactory.selection(node);

                if (!this.newSize) {
                    return selectedNode;
                }

                return NodeDecoratorsFactory.resizing(selectedNode);
            }

            return node;
        });
    }
}
