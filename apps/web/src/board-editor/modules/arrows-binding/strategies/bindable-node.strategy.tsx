import type { NodeBase } from "@repo/boards-common";
import type { Point } from "@repo/common";
import { type Decoratable, withNodeId } from "@/board-editor/core";
import type { BindingNodeHandlers } from "../types";
import { BindingPoints } from "../ui/binding-points.component";

export abstract class BindableNodeStrategy<T extends NodeBase = NodeBase> {
    public abstract getReferencePoints(node: T): Point[];

    public updateNode(entry: Decoratable, handlers: BindingNodeHandlers, active: boolean) {
        entry.wrapper.setHandlers({
            onMouseEnter: withNodeId(nodeId => {
                handlers.onMouseEnter?.(nodeId);
            }),
            onMouseLeave: active ? handlers.onMouseLeave : undefined
        });
    }

    public ui(node: T, handlers: BindingNodeHandlers) {
        const referencePoints = this.getReferencePoints(node);

        const handleMouseUp = (point: Point) => {
            handlers.onMouseUp?.({
                relativeTo: node.id,
                ...point
            });
        };

        return <BindingPoints referencePoints={referencePoints} onMouseUp={handleMouseUp} />;
    }
}
