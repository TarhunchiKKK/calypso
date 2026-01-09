import { NodesMapper } from "@/features/board-editor/core";
import { AnyNode } from "@/features/board-editor/nodes";

export class StickersNodesMapper extends NodesMapper {
    public static from(nodes: AnyNode[]) {
        return new StickersNodesMapper(nodes);
    }
}
