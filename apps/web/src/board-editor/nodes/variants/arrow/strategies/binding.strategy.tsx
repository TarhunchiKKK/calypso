import type { ArrowNode } from "@repo/boards";
import type { Decoratable } from "@/board-editor/core";
import { NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";
import { isResolvedArrow } from "@/board-editor/modules/arrows-resolution";

const className = "absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-resizing rounded-full cursor-crosshair pointer-events-none";

export class ArrowBindingStrategy extends NodeBindingStrategy {
    public override updateNode(entry: Decoratable) {
        entry.wrapper.setUiSetting("noPointerEvents", true);
    }

    public override ui(entry: Decoratable<ArrowNode>) {
        if (!isResolvedArrow(entry.data)) {
            throw new Error(`Arrow not resolved: ${entry.data}`);
        }

        const { start, end } = entry.data.absolutePosition;

        return (
            <>
                <div className={className} style={{ left: start.x, top: start.y }} />

                <div className={className} style={{ left: end.x, top: end.y }} />
            </>
        );
    }
}
