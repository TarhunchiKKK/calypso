import type { NodeBase } from "@repo/boards-common";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/factories/node-wrappers.factory";
import type { NodeWrapper } from "../classes/node-wrapper.class";
import type { Decoratable } from "../types/decorators.types";

export abstract class NodesMapper {
    protected nodes: NodeWrapper[] = [];

    public constructor(protected inputNodes: NodeBase[]) {
        this.nodes = inputNodes.map(node => NodeWrappersFactory.wrap(inputNodes, node));
    }

    public map(): Decoratable[] {
        return this.nodes;
    }
}

export class DefaultNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new DefaultNodesMapper(nodes);
    }
}
