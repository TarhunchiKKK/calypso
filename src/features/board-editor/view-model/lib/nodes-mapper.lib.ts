import { NodesFactory } from "../../nodes/compose/nodes.factory";
import { AnyNode } from "../../nodes/compose/types";
import { NodeWrapper } from "../../nodes/variants/base";

export class NodesMapper {
    protected nodes: NodeWrapper[] = [];

    public constructor(protected inputNodes: AnyNode[]) {}

    public wrap() {
        this.nodes = this.inputNodes.map(node => NodesFactory.wrap(node));
        return this;
    }

    public get() {
        return this.nodes;
    }
}
