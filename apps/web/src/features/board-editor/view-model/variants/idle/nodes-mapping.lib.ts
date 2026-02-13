import type { NodeBase } from "@repo/common";
import { type NodeHandlers, NodesMapper } from "@/features/board-editor/core";

export class IdleNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new IdleNodesMapper(nodes);
    }

    public map(handlers: NodeHandlers) {
        this.nodes = this.nodes.map(node =>
            node.setHandler("onMouseDown", handlers.onMouseDown).setHandler("onMouseUp", handlers.onMouseUp).setHandler("onClick", handlers.onClick)
        );

        return this;
    }
}
