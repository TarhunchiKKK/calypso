import type { DrawingNode } from "@lib/boards";
import { NodesMapper } from "@/board-editor/core";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";

export class DrawingNodesMapper extends NodesMapper {
    private drawingNode?: DrawingNode;

    public static create() {
        return new DrawingNodesMapper();
    }

    public setDrawingNode(node?: DrawingNode) {
        this.drawingNode = node;
        return this;
    }

    public override map() {
        const wrappers = this.wrapNodes();

        if (this.drawingNode) {
            const wrapper = NodeWrappersFactory.wrap(this.drawingNode);
            wrappers.push(wrapper);
        }

        return wrappers;
    }
}
