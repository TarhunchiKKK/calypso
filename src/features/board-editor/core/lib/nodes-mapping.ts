import { NodeWrapper, Renderable } from "..";
import { NodesFactory } from "../../nodes/compose/nodes.factory";
import { AnyNode } from "../../nodes/compose/types";

export class NodesMapper {
    protected nodes: NodeWrapper<AnyNode>[] = [];

    public constructor(protected inputNodes: AnyNode[]) {
        this.nodes = inputNodes.map(NodesFactory.wrap);
    }

    public unwrap() {
        return this.nodes.map(node => node.data);
    }

    // REFACTOR: this method should become abstract
    public get(): Renderable[] {
        return this.nodes;
    }
}
