import type { MouseEventsMediator } from "@/shared/lib/react";
import { type NodeBase, NodesMapper } from "@/features/board-editor/core";

export class IdleNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new IdleNodesMapper(nodes);
    }

    public map(handlers: ReturnType<typeof MouseEventsMediator.prototype.createHandlers>) {
        this.nodes = this.nodes.map(node =>
            node
                .setHandler("onMouseDown", handlers.onMouseDown)
                .setHandler("onMouseUp", handlers.onMouseUp)
                .setHandler("onClick", handlers.onClick)
        );

        return this;
    }
}
