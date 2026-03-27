import { NodesMapper } from "@/board-editor/core";
import type { Boards } from "@repo/common";

export class ShapeSelectionNodesMapper extends NodesMapper {
    public static from(nodes: Boards.NodeBase[]) {
        return new ShapeSelectionNodesMapper(nodes);
    }
}
