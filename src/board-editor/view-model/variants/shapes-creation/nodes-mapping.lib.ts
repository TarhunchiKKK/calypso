import { type NodeBase, NodesMapper } from "@/board-editor/core";

export class ShapesCreationNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new ShapesCreationNodesMapper(nodes);
    }
}
