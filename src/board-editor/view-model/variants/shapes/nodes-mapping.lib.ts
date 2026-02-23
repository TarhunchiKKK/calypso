import { type NodeBase, NodesMapper } from "@/board-editor/core";

export class ShapesNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new ShapesNodesMapper(nodes);
    }
}
