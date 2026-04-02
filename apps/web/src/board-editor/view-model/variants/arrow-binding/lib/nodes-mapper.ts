import type { Id } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";
import type { BindingNodeHandlers } from "@/board-editor/modules/arrows-binding";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/builders/decoratable-node.builder";
import type { NodeBase } from "@repo/boards-common";

export class ArrowBindingNodesMapper extends NodesMapper {
    private arrowId!: Id;

    private bindingNodeId?: Id;

    private bindingNodeHandlers: BindingNodeHandlers = {};

    public static from(nodes: NodeBase[]) {
        return new ArrowBindingNodesMapper(nodes);
    }

    public setArrowId(arrowId: Id) {
        this.arrowId = arrowId;
        return this;
    }

    public setBindingNodeId(bindingNodeId?: Id) {
        this.bindingNodeId = bindingNodeId;
        return this;
    }

    public setBindingHandlers(handlers: BindingNodeHandlers) {
        this.bindingNodeHandlers = handlers;
        return this;
    }

    public override map() {
        return this.nodes.map(node => {
            if (node.id === this.arrowId) {
                return DecoratableNodeBuilder.from(node).select().resizable().build();
            }

            if (node.id === this.bindingNodeId) {
                return DecoratableNodeBuilder.from(node).bindable(this.bindingNodeHandlers).build();
            }

            return node;
        });
    }
}
