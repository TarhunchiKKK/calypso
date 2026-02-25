import { NodesMapper } from "@/board-editor/core";
import type { NodeBase } from "@/entities/nodes";

export class ShapesCreationNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new ShapesCreationNodesMapper(nodes);
    }
}
