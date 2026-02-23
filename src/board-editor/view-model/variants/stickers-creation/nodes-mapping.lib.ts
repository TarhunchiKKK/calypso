import { type NodeBase, NodesMapper } from "@/board-editor/core";

export class StickersCreationNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new StickersCreationNodesMapper(nodes);
    }
}
