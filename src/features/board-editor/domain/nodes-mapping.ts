import { NodeImpl } from "../nodes/variants/base";

export class NodesMapper {
    public constructor(protected nodes: NodeImpl[]) {}

    public clone() {
        this.nodes = this.nodes.map(node => node.clone());
        return this;
    }

    public get() {
        return this.nodes;
    }
}
