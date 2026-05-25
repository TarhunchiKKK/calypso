import type { NodeBase } from "@repo/boards";
import type { Id, Rect } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";

export class ResizingNodesMapper extends NodesMapper {
    private nodeId!: Id;

    private newSize?: Rect = undefined;

    public static create() {
        return new ResizingNodesMapper();
    }

    public setNodeId(nodeId: Id) {
        this.nodeId = nodeId;
        return this;
    }

    public setNewSize(newSize?: Rect) {
        this.newSize = newSize;
        return this;
    }

    private getNodesWithUpdatedSizes(nodes: NodeBase[], nodeId: Id, newSize: Rect) {
        const resizingNode = nodes.find((node) => node.id === nodeId);

        if (!resizingNode) {
            throw new Error(`Resizing node not found (id='${nodeId})'`);
        }

        const resizedNode = NodeDecoratorsFactory.resizing(NodeWrappersFactory.wrap(resizingNode), newSize).data;

        return [...nodes.filter((node) => node.id !== nodeId), resizedNode];
    }

    public override map() {
        const nodes = this.newSize ? this.getNodesWithUpdatedSizes(this.nodes, this.nodeId, this.newSize) : this.nodes;

        return nodes
            .map((node) => NodeWrappersFactory.wrap(node))
            .map((wrapper) => {
                if (this.nodeId === wrapper.id) {
                    const selectedNode = NodeDecoratorsFactory.selection(wrapper);

                    if (!this.newSize) {
                        return selectedNode;
                    }

                    return NodeDecoratorsFactory.resizing(selectedNode);
                }

                return wrapper;
            });
    }
}
