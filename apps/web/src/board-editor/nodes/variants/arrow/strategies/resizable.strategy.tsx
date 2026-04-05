import type { ArrowNode } from "@repo/boards-common";
import type { Decoratable } from "@/board-editor/core";
import { ResizableNodeStrategy } from "@/board-editor/modules/resizing";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/factories/node-wrappers.factory";

const className = "absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-resizing rounded-full cursor-crosshair";

export class ResizableArrowStrategy extends ResizableNodeStrategy {
    public override ui(node: Decoratable<ArrowNode>) {
        if (!NodeWrappersFactory.is(node.wrapper, "arrow")) {
            throw Error("Wrapper should be instance of ArrowNodeWrapper");
        }

        const { start, end } = node.wrapper.absolutePosition;

        return (
            <>
                <div className={className} style={{ left: start.x, top: start.y }} onMouseDown={() => this?.handler?.(node.id, "s")} />

                <div className={className} style={{ left: end.x, top: end.y }} onMouseDown={() => this?.handler?.(node.id, "n")} />
            </>
        );
    }
}
