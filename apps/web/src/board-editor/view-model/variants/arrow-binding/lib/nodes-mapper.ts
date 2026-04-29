import type { NodeBase } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";
import type { BindingNodeHandlers } from "@/board-editor/modules/arrows-binding";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/builders/decoratable-node.builder";

export class ArrowBindingNodesMapper extends NodesMapper {
    private arrowId!: Id;

    private bindingNodeId?: Id;

    private bindingHandlers!: BindingNodeHandlers;

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
        this.bindingHandlers = handlers;
        return this;
    }

    public override map() {
        return this.nodes.map(node => {
            const builder = DecoratableNodeBuilder.from(node);

            if (node.id === this.arrowId) {
                builder.selection().binding();
            } else {
                const isActive = node.id === this.bindingNodeId;

                builder.bindable(this.bindingHandlers, isActive);
            }

            return builder.build();
        });
    }
}
