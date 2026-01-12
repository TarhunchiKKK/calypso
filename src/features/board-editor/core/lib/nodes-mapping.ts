import { NodeBase, NodeWrapper, Renderable } from "..";
import { NodesFactory } from "../../nodes/compose/nodes.factory";

export class NodesMapper {
    protected nodes: NodeWrapper[] = [];

    public constructor(protected inputNodes: NodeBase[]) {
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
