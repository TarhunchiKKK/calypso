import type { Decoratable } from "@/board-editor/core";
import type { ResolvedArrow } from "@/board-editor/modules/arrows-resolution";
import { ResizableNodeStrategy, type ResizeHandler } from "@/board-editor/modules/resizing";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";

const className = "absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-resizing rounded-full cursor-crosshair";

export class ResizableArrowStrategy extends ResizableNodeStrategy {
    public override ui(node: Decoratable<ResolvedArrow>, handler: ResizeHandler) {
        if (!NodeWrappersFactory.is(node.wrapper, "arrow")) {
            throw Error("Wrapper should be instance of ArrowNodeWrapper");
        }

        const { start, end } = node.data.absolutePosition;

        return (
            <>
                <div className={className} style={{ left: start.x, top: start.y }} onMouseDown={() => handler(node.id, "n")} />

                <div className={className} style={{ left: end.x, top: end.y }} onMouseDown={() => handler(node.id, "s")} />
            </>
        );
    }
}
