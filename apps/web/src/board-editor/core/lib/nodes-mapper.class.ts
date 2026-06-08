import type { NodeBase } from "@lib/boards";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";
import type { NodeHandlers } from "../classes/node-wrapper.class";
import type { Decoratable } from "../types/decorators.types";

export abstract class NodesMapper {
    protected nodes: NodeBase[] = [];

    protected handlers: NodeHandlers = {};

    public setNodes(nodes: NodeBase[]) {
        this.nodes = nodes;
        return this;
    }

    public setHandlers(handlers: NodeHandlers) {
        this.handlers = handlers;
        return this;
    }

    public wrapNodes() {
        return this.nodes.map(NodeWrappersFactory.wrap).map((wrapper) => wrapper.setHandlers(this.handlers));
    }

    public abstract map(): Decoratable[];
}

export class DefaultNodesMapper extends NodesMapper {
    public static create() {
        return new DefaultNodesMapper();
    }

    public override map() {
        return this.wrapNodes();
    }
}
