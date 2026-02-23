import { type NodeBase, type NodeHandlers, NodesMapper } from "@/features/board-editor/core";

export class IdleNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new IdleNodesMapper(nodes);
    }

    public map(handlers: NodeHandlers) {
        this.nodes = this.nodes.map(node => node.setHandlers(handlers));
        return this;
    }
}
