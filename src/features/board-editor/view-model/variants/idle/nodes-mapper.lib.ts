import { NodesMapper } from "@/features/board-editor/view-model/lib/nodes-mapper.lib";
import { NodeImpl } from "@/features/board-editor/nodes/variants/base";
import { MouseEventsMediator } from "@/shared/lib/react";

export class IdleNodesMapper extends NodesMapper {
    private constructor(nodes: NodeImpl[]) {
        super(nodes);
    }

    public static from(nodes: NodeImpl[]) {
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
