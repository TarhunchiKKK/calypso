import type { Boards } from "@repo/common";
import type { NodeWrapper } from "../classes/node-wrapper.class";
import type { Decoratable } from "../types/decorators.types";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/factories/node-wrappers.factory";

export abstract class NodesMapper {
    protected nodes: NodeWrapper[] = [];

    public constructor(protected inputNodes: Boards.NodeBase[]) {
        this.nodes = inputNodes.map(node => NodeWrappersFactory.wrap(inputNodes, node));
    }

    public map(): Decoratable[] {
        return this.nodes;
    }
}
