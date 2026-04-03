import type { NodeBase } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { type Decoratable, type NodeHandlers, NodesMapper } from "@/board-editor/core";
import type { ResizeHandler } from "@/board-editor/modules/resizing";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";

export class SelectionNodesMapper extends NodesMapper {
    private selectedIds!: Set<Id>;

    private resizeHandler!: ResizeHandler;

    private nodeHandlers!: NodeHandlers;

    public setSelectedIds(ids: Set<Id>) {
        this.selectedIds = ids;
        return this;
    }

    public setHandlers(handlers: NodeHandlers) {
        this.nodeHandlers = handlers;
        return this;
    }

    public setResizeHandler(handler: ResizeHandler) {
        this.resizeHandler = handler;
        return this;
    }

    public static from(nodes: NodeBase[]) {
        return new SelectionNodesMapper(nodes);
    }

    public override map() {
        const withHandlers: Decoratable[] = this.nodes.map(node => node.setHandlers(this.nodeHandlers));

        let withResizing: Decoratable[] = [];
        if (this.selectedIds.size === 1) {
            const nodeId = this.selectedIds.values().next().value as string;

            withResizing = withHandlers.map(node =>
                node.id === nodeId ? NodeDecoratorsFactory.resizable(node, this.resizeHandler) : node
            );
        } else {
            withResizing = withHandlers;
        }

        return withResizing.map(node => (this.selectedIds.has(node.id) ? NodeDecoratorsFactory.selection(node) : node));
    }
}
