import { NodesMapper } from "@/board-editor/core";
import type { NodeBase } from "@/entities/nodes";

export class ShapeSelectionNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new ShapeSelectionNodesMapper(nodes);
    }
}
