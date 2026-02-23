import { NodesMapper, type NodeBase } from "@/features/board-editor/core";

export class StickersNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new StickersNodesMapper(nodes);
    }
}
