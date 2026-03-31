import type { Boards } from "@repo/common";
import { NodeDecoratorsFactory } from "../../nodes/compose/factories/node-decorators.factory";
import type { NodeWrapper } from "../classes/node-wrapper.class";
import type { Decoratable } from "../types/decorators.types";

export abstract class NodesMapper {
    protected nodes: NodeWrapper[] = [];

    public constructor(protected inputNodes: Boards.NodeBase[]) {
        this.nodes = inputNodes.map(NodeDecoratorsFactory.wrap);
    }

    public map(): Decoratable[] {
        return this.nodes;
    }
}
