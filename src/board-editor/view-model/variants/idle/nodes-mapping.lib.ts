import { type NodeHandlers, NodesMapper } from "@/board-editor/core";
import type { NodeBase } from "@/entities/nodes";

export class IdleNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new IdleNodesMapper(nodes);
    }

    public map(handlers: NodeHandlers) {
        this.nodes = this.nodes.map(node => node.setHandlers(handlers));
        return this;
    }
}
