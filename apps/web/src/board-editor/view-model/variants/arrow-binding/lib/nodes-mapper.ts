import type { ArrowNode } from "@lib/boards";
import type { Id } from "@lib/common";
import { NodesMapper } from "@/board-editor/core";
import type { BindingNodeHandlers } from "@/board-editor/modules/arrows-binding";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/lib/decoratable-node.builder";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";

export class ArrowBindingNodesMapper extends NodesMapper {
    private arrow?: ArrowNode;

    private bindingNodeId?: Id;

    private bindingHandlers!: BindingNodeHandlers;

    public static create() {
        return new ArrowBindingNodesMapper();
    }

    public setArrow(arrow?: ArrowNode) {
        this.arrow = arrow;
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
        return this.wrapNodes()
            .map((wrapper) => {
                if (this.arrow && this.arrow.id === wrapper.id) {
                    return NodeWrappersFactory.wrap(this.arrow);
                }

                return wrapper;
            })
            .map((wrapper) => {
                const builder = DecoratableNodeBuilder.from(wrapper);

                if (this.arrow?.id === wrapper.id) {
                    builder.selection().binding();
                } else {
                    const isActive = wrapper.id === this.bindingNodeId;

                    builder.bindable(this.bindingHandlers, isActive);
                }

                return builder.build();
            });
    }
}
