import type { NodeBase } from "@repo/boards-common";
import type { Point } from "@repo/common";
import { BindingPoints } from "./binding-points.component";
import type { BindingNodeHandlers } from "./types";

export abstract class NodeBindingStrategy<T extends NodeBase = NodeBase> {

    public abstract getReferencePoints(node: T): Point[];

    public ui(node: T,handlers: BindingNodeHandlers) {
        const referencePoints = this.getReferencePoints(node);

        const updatedHandlers = {
            onMouseEnter: () => handlers.onMouseEnter?.(node.id),
            onMouseLeave: handlers.onMouseLeave,
            onMouseUp: (e: React.MouseEvent) => {
                handlers.onMouseUp?.({
                    relativeTo: node.id,
                    x: e.currentTarget.clientLeft,
                    y: e.currentTarget.clientTop
                });
            }
        };

        return <BindingPoints referencePoints={referencePoints} handlers={updatedHandlers} />;
    }
}
