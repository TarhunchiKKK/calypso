import type { NodeBase } from "@repo/boards-common";
import { NodesMapper } from "../core";

export class DefaultNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new DefaultNodesMapper(nodes);
    }
}
