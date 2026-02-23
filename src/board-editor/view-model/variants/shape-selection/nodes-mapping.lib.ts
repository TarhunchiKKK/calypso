import { type NodeBase, NodesMapper } from "@/board-editor/core";

export class ShapeSelectionNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new ShapeSelectionNodesMapper(nodes);
    }
}
