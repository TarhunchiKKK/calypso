import { MouseEventsMediator } from "@/shared/lib/react";
import { AnyNode } from "@/features/board-editor/nodes";
import { NodesMapper } from "@/features/board-editor/core";

export class IdleNodesMapper extends NodesMapper {
    private constructor(inputNodes: AnyNode[]) {
        super(inputNodes);
    }

    public static from(nodes: AnyNode[]) {
        return new IdleNodesMapper(nodes);
    }

    public applyHandlers(handlers: ReturnType<typeof MouseEventsMediator.prototype.createHandlers>) {
        this.nodes = this.nodes.map(node =>
            node
                .setHandler("onMouseDown", handlers.onMouseDown)
                .setHandler("onMouseUp", handlers.onMouseUp)
                .setHandler("onClick", handlers.onClick)
        );

        return this;
    }
}
