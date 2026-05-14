import { type Decoratable, getNodeId } from "@/board-editor/core";
import type { ResizeDirection, ResizeHandler } from "@/board-editor/modules/resizing";
import { ResizableNodeStrategy } from "@/board-editor/modules/resizing/strategies/resizable-node.strategy";
import { ResizeBorders } from "../ui";

type Sides = {
    rect?: boolean;

    diagonal?: boolean;
};

export class ResizableRectNodeStrategy extends ResizableNodeStrategy {
    public constructor(protected readonly sides: Sides) {
        super();
    }

    public override ui(_: Decoratable, handler: ResizeHandler) {
        const onResizeStart = (direction: ResizeDirection, e: React.MouseEvent) => {
            e.stopPropagation();

            const nodeId = getNodeId(e);

            if (!nodeId) {
                throw new Error("Node id not found");
            }

            handler(nodeId, direction);
        };

        return <ResizeBorders {...this.sides} onResizeStart={onResizeStart} />;
    }
}
