import { getNodeId, type NodeWrapper, type Rect, type RectNode } from "@/features/board-editor/core";
import { ResizeBorders } from "../resize-borders.component";
import type { ResizeDirection, ResizeHandler } from "../types";

export abstract class ResizeStrategy {
    public constructor(protected readonly handler?: ResizeHandler) {}

    public abstract updateNode(wrapper: NodeWrapper, size: Rect): void;

    public abstract ui(): React.ReactNode;
}

export class RectNodeResizeStrategy extends ResizeStrategy {
    public override updateNode(wrapper: NodeWrapper<RectNode>, size: Rect): void {
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
