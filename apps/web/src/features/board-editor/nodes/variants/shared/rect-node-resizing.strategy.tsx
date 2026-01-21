import { getNodeId, type NodeWrapper, type Rect, type RectNode } from "@/features/board-editor/core";
import { NodeResizingStrategy, ResizeBorders, type ResizeDirection } from "@/features/board-editor/modules/resizing";

export class RectNodeResizingStrategy extends NodeResizingStrategy {
    public override updateNodeSizes(wrapper: NodeWrapper<RectNode>, size: Rect) {
        wrapper.data = { ...wrapper.data, rect: size };
    }

    public override ui() {
        const onResizeStart = (direction: ResizeDirection, e: React.MouseEvent) => {
            e.stopPropagation();

            const nodeId = getNodeId(e);

            if (!nodeId) {
                throw new Error("Node id not found");
            }

            this.handler?.(nodeId, direction);
        };

        return <ResizeBorders main cross diagonal onResizeStart={onResizeStart} />;
    }
}
