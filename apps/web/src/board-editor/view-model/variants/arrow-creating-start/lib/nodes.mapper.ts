import type { Boards } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";

export class ArrowCreatingStartNodesMapper extends NodesMapper {
    public static from(nodes: Boards.NodeBase[]) {
        return new ArrowCreatingStartNodesMapper(nodes);
    }
}
