import type { Id } from "@repo/common";
import { type Decoratable, NodesMapper } from "@/board-editor/core";
import type { ResizeHandler } from "@/board-editor/modules/resizing";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";

export class SelectionNodesMapper extends NodesMapper {
    private selectedIds!: Set<Id>;

    private resizeHandler!: ResizeHandler;

    public setSelectedIds(ids: Set<Id>) {
        this.selectedIds = ids;
        return this;
    }

    public setResizeHandler(handler: ResizeHandler) {
        this.resizeHandler = handler;
        return this;
    }

    public static create() {
        return new SelectionNodesMapper();
    }

    public override map() {
        let withResizing: Decoratable[] = [];
        if (this.selectedIds.size === 1) {
            const nodeId = this.selectedIds.values().next().value as string;

            withResizing = this.wrapNodes().map(node => (node.id === nodeId ? NodeDecoratorsFactory.resizable(node, this.resizeHandler) : node));
        } else {
            withResizing = this.wrapNodes();
        }

        return withResizing.map(node => (this.selectedIds.has(node.id) ? NodeDecoratorsFactory.selection(node) : node));
    }
}
