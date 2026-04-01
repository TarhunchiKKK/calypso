import type { Boards } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import { NodeResizingStrategy } from "@/board-editor/modules/resizing";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/factories/node-wrappers.factory";

// REFACTOR: set color as constant
const className =
    "absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-700 rounded-full cursor-crosshair";

export class ArrowResizingStrategy extends NodeResizingStrategy {
    public override updateNodeSizes() {}

    public override ui(node: Decoratable<Boards.ArrowNode>) {
        if (!NodeWrappersFactory.is(node.wrapper, "arrow")) {
            throw Error("Wrapper should be instance of ArrowNodeWrapper");
        }

        const { start, end } = node.wrapper.absolutePosition;

        return (
            <>
                <div
                    className={className}
                    style={{ left: start.x, top: start.y }}
                    onMouseDown={() => this?.handler?.(node.id, "s")}
                />

                <div
                    className={className}
                    style={{ left: end.x, top: end.y }}
                    onMouseDown={() => this?.handler?.(node.id, "n")}
                />
            </>
        );
    }
}
