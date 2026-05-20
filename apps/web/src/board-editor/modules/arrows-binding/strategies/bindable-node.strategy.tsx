import type { NodeBase } from "@repo/boards";
import type { Point } from "@repo/common";
import { type Decoratable, withNodeId } from "@/board-editor/core";
import { NodeRectsFactory } from "@/entities/nodes";
import type { BindingNodeHandlers } from "../types";
import { BindingPoints } from "../ui/binding-points.component";

export abstract class BindableNodeStrategy<T extends NodeBase = NodeBase> {
    public abstract getReferencePoints(node: T): Point[];

    public updateNode(entry: Decoratable, handlers: BindingNodeHandlers, active: boolean) {
        entry.wrapper.setHandlers({
            onMouseEnter: withNodeId((nodeId) => {
                handlers.onMouseEnter?.(nodeId);
            }),
            onMouseLeave: active ? handlers.onMouseLeave : undefined
        });
    }

    public ui(node: T, handlers: BindingNodeHandlers) {
        const referencePoints = this.getReferencePoints(node);

        const rect = NodeRectsFactory.rect(node);

        const handleMouseUp = (point: Point) => {
            handlers.onMouseUp?.({
                relativeTo: node.id,
                ...point
            });
        };

        return <BindingPoints referencePoints={referencePoints} rect={rect} onMouseUp={handleMouseUp} />;
    }
}
