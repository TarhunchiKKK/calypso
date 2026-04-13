import type { NodeBase } from "@repo/boards-common";
import { NodesMapper } from "@/board-editor/core";

export class MediaSelectionNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new MediaSelectionNodesMapper(nodes);
    }
}
