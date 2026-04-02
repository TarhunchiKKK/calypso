import { type NodeHandlers, NodesMapper } from "@/board-editor/core";
import type { NodeBase } from "@repo/boards-common";

export class IdleNodesMapper extends NodesMapper {
    private nodesHandlers!: NodeHandlers;

    public static from(nodes: NodeBase[]) {
        return new IdleNodesMapper(nodes);
    }

    public setNodesHandlers(nodesHandlers: NodeHandlers) {
        this.nodesHandlers = nodesHandlers;
        return this;
    }

    public override map() {
        return this.nodes.map(node => node.setHandlers(this.nodesHandlers));
    }
}
