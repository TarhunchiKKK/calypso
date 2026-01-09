import { NodeWrapper } from "../../core";
import { NodesFactory } from "../../nodes/compose/nodes.factory";
import { AnyNode } from "../../nodes/compose/types";

export class NodesMapper {
    protected nodes: NodeWrapper[] = [];

    public constructor(protected inputNodes: AnyNode[]) {}

    public wrap() {
        this.nodes = this.inputNodes.map(node => NodesFactory.wrap(node));
        return this;
    }

    public unwrap() {
        return this.nodes.map(node => node.data);
    }

    public get() {
        return this.nodes;
    }
}
