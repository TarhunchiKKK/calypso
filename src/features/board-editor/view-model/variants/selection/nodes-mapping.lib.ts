import { NodesMapper } from "@/features/board-editor/core";
import { MouseEventsMediator } from "@/shared/lib/react";
import { SelectionViewState } from "./view-state";
import { ResizeDirection } from "@/features/board-editor/modules/resizing";
import { AnyNode } from "@/features/board-editor/nodes";

export class SelectionNodesMapper extends NodesMapper {
    private constructor(
        inputNodes: AnyNode[],
        private viewState: SelectionViewState
    ) {
        super(inputNodes);
    }

    public static from(nodes: AnyNode[], viewState: SelectionViewState) {
        return new SelectionNodesMapper(nodes, viewState);
    }

    public applySelection(
        selectionWindowIds: Set<string>,
        resizeHandler: (nodeId: string, direction: ResizeDirection) => void
    ) {
        const onlyOneNodeSelected = this.viewState.selectedIds.size === 1;

        this.nodes = this.nodes.map(node => {
            if (this.viewState.selectedIds.has(node.id) || selectionWindowIds.has(node.id)) {
                if (onlyOneNodeSelected) {
                    return node.select(true).setHandler("onResizeStart", resizeHandler);
                }
                return node.select();
            }

            return node;
        });

        return this;
    }

    public applyHandlers(handlers: ReturnType<typeof MouseEventsMediator.prototype.createHandlers>) {
        this.nodes = this.nodes.map(node =>
            node
                .setHandler("onClick", handlers.onClick)
                .setHandler("onMouseDown", handlers.onMouseDown)
                .setHandler("onMouseUp", handlers.onMouseUp)
        );

        return this;
    }
}
