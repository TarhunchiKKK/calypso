import { type NodeHandlers, NodesMapper } from "@/board-editor/core";
import type { Boards } from "@repo/common";

export class IdleNodesMapper extends NodesMapper {
    private nodesHandlers!: NodeHandlers;

    public static from(nodes: Boards.NodeBase[]) {
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
