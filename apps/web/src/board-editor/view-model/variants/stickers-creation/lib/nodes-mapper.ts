import type { Boards } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";

export class StickersCreationNodesMapper extends NodesMapper {
    public static from(nodes: Boards.NodeBase[]) {
        return new StickersCreationNodesMapper(nodes);
    }
}
