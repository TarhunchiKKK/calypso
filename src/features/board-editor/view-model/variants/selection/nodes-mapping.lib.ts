import { Decoratable, NodeBase, NodeHandlers, NodesMapper, NodeWrapper } from "@/features/board-editor/core";
import { ResizeDirection, ResizeHandler } from "@/features/board-editor/modules/resizing";
import { NodesFactory } from "@/features/board-editor/nodes";

export class SelectionNodesMapper extends NodesMapper {
    private selectedIds!: Set<string>;

    // QUESTION: should selection window appears here ?
    private selectionWindowIds!: Set<string>;

    private resizeHandler!: ResizeHandler;

    private nodeHandlers!: NodeHandlers;

    public setSelectedIds(ids: Set<string>) {
        this.selectedIds = ids;
        return this;
    }

    public setSelectionWindowIds(ids: Set<string>) {
        this.selectionWindowIds = ids;
        return this;
    }

    public setHandlers(handlers: NodeHandlers) {
        this.nodeHandlers = handlers;
        return this;
    }

    public setResizeHandler(handler: (nodeId: string, direction: ResizeDirection) => void) {
        this.resizeHandler = handler;
        return this;
    }

    public static from(nodes: NodeBase[]) {
        return new SelectionNodesMapper(nodes);
    }

    private applyHandlers(wrappers: NodeWrapper[], handlers: NodeHandlers) {
        return wrappers.map(node =>
            node
                .setHandler("onClick", handlers.onClick)
                .setHandler("onMouseDown", handlers.onMouseDown)
                .setHandler("onMouseUp", handlers.onMouseUp)
        );
    }

    private applySelection(wrappers: NodeWrapper[], selection1: Set<string>, selection2: Set<string>): Decoratable[] {
        return wrappers.map(wrapper =>
            selection1.has(wrapper.id) || selection2.has(wrapper.id) ? NodesFactory.select(wrapper) : wrapper
        );
    }

    private applyResizing(wrappers: NodeWrapper[], nodeId: string, handler: ResizeHandler) {
        return wrappers.map(wrapper => (wrapper.id === nodeId ? NodesFactory.resizable(wrapper, handler) : wrapper));
    }

    public override get() {
        let wrappers = this.applyHandlers(this.nodes, this.nodeHandlers);

        if (this.selectedIds.size === 1) {
            wrappers = this.applyResizing(
                wrappers,
                this.selectedIds.values().next().value as string,
                this.resizeHandler

                // DELETE: type casting
            ) as NodeWrapper[];
        }

        return this.applySelection(wrappers, this.selectedIds, this.selectionWindowIds);
    }
}
