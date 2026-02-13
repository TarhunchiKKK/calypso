import type { NodeBase } from "@repo/common";
import { NodesMapper } from "@/features/board-editor/core";

export class StylingNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new StylingNodesMapper(nodes);
    }
}
