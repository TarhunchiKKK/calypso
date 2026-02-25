import { NodesMapper } from "@/board-editor/core";
import type { NodeBase } from "@/entities/nodes";

export class StickersCreationNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new StickersCreationNodesMapper(nodes);
    }
}
