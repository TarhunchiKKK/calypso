import type { NodeBase, NodeWrapper, Renderable } from "..";
import { NodeDecoratorsFactory } from "../../nodes/compose/factories/node-decorators.factory";

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
