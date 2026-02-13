import type { NodeBase } from "@repo/common";
import { NodeDecoratorsFactory } from "../../nodes/compose/factories/node-decorators.factory";
import type { NodeWrapper } from "../classes/node-wrapper.class";
import type { Renderable } from "../types/ui.types";

export class NodesMapper {
    protected nodes: NodeWrapper[] = [];

    public constructor(protected inputNodes: NodeBase[]) {
        this.nodes = inputNodes.map(NodeDecoratorsFactory.wrap);
    }

    public unwrap() {
        return this.nodes.map(node => node.data);
    }

    // REFACTOR: this method should become abstract
    public get(): Renderable[] {
        return this.nodes;
    }
}
