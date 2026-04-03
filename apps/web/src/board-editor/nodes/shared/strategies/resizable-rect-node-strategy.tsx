import { getNodeId } from "@/board-editor/core";
import type { ResizeDirection } from "@/board-editor/modules/resizing";
import { ResizableNodeStrategy } from "@/board-editor/modules/resizing/strategies/resizable-node.strategy";
import { ResizeBorders } from "../ui";

export class ResizableRectNodeStrategy extends ResizableNodeStrategy {
    public override ui() {
        const onResizeStart = (direction: ResizeDirection, e: React.MouseEvent) => {
            e.stopPropagation();

            const nodeId = getNodeId(e);

            if (!nodeId) {
                throw new Error("Node id not found");
            }

            this.handler(nodeId, direction);
        };

        return <ResizeBorders main cross diagonal onResizeStart={onResizeStart} />;
    }
}
