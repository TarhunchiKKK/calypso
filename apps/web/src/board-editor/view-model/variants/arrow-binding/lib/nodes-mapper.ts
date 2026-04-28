import type { NodeBase } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { NodesMapper, withNodeId } from "@/board-editor/core";
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
        const handleMouseEnter = withNodeId(nodeId => {
            this.bindingHandlers.onMouseEnter(nodeId);
        });

        return this.nodes
            .map(node => {
                if (node.id === this.arrowId) {
                    // REFACTOR: move this to strategy
                    return node.setUiSetting("noPointerEvents", true);
                }

                return node.setHandlers({
                    onMouseEnter: handleMouseEnter,
                    onMouseLeave: node.id === this.bindingNodeId ? this.bindingHandlers.onMouseLeave : undefined
                });
            })
            .map(node => {
                if (node.id === this.arrowId) {
                    return DecoratableNodeBuilder.from(node).selection().resizing().build();
                }

                if (node.id === this.bindingNodeId) {
                    return DecoratableNodeBuilder.from(node).bindable(this.bindingHandlers.onMouseUp).build();
                }

                return node;
            });
    }
}
