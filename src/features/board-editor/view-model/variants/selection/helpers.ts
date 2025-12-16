import { ResizeDirection } from "@/features/board-editor/domain/dom";
import { NodesMapper } from "@/features/board-editor/domain/nodes-mapping";
import { NodeImpl } from "@/features/board-editor/nodes/variants/base";
import { MouseEventsMediator } from "@/shared/lib/react";

export class SelectionNodesMapper extends NodesMapper {
    private constructor(nodes: NodeImpl[]) {
        super(nodes);
    }

    public static from(nodes: NodeImpl[]) {
        return new SelectionNodesMapper(nodes);
    }

    public applySelection(
        viewStateIds: Set<string>,
        selectionWindowIds: Set<string>,
        resizeHandler: (nodeId: string, direction: ResizeDirection) => void
    ) {
        const onlyOneNodeSelected = viewStateIds.size === 1;

        this.nodes = this.nodes.map(node => {
            if (viewStateIds.has(node.id) || selectionWindowIds.has(node.id)) {
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
