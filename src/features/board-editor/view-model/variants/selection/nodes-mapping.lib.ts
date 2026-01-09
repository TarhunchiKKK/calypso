import { NodesMapper, NodeWrapper } from "@/features/board-editor/core";
import { MouseEventsMediator } from "@/shared/lib/react";
import { SelectionViewState } from "./view-state";
import { ResizeDirection } from "@/features/board-editor/modules/resizing";
import { AnyNode } from "@/features/board-editor/nodes";
import { SelectedNodeDecorator } from "@/features/board-editor/modules/selection";

export class SelectionNodesMapper extends NodesMapper {
    public static from(nodes: AnyNode[]) {
        return new SelectionNodesMapper(nodes);
    }

    public map(
        viewState: SelectionViewState,
        selectionWindowIds: Set<string>,
        resizeHandler: (nodeId: string, direction: ResizeDirection) => void
    ) {
        const onlyOneNodeSelected = viewState.selectedIds.size === 1;

        this.nodes = this.nodes.map(node => {
            if (viewState.selectedIds.has(node.id) || selectionWindowIds.has(node.id)) {
                if (onlyOneNodeSelected) {
                    return new SelectedNodeDecorator(
                        node.wrapper.select(true).setHandler("onResizeStart", resizeHandler)
                    );
                }
                return new SelectedNodeDecorator(node);
            }

            return new SelectedNodeDecorator(node);
        }) as NodeWrapper[];

        return this;
    }

    public applyHandlers(handlers: ReturnType<typeof MouseEventsMediator.prototype.createHandlers>) {
        this.nodes = this.nodes.map(node =>
            node.wrapper
                .setHandler("onClick", handlers.onClick)
                .setHandler("onMouseDown", handlers.onMouseDown)
                .setHandler("onMouseUp", handlers.onMouseUp)
        );

        return this;
    }
}
