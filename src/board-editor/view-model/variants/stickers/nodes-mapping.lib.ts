import { type NodeBase, NodesMapper } from "@/board-editor/core";

export class StickersNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new StickersNodesMapper(nodes);
    }
}
