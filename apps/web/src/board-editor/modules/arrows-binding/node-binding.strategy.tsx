import type { NodeBase } from "@repo/boards-common";
import type { Point } from "@repo/common";
import { BindingPoints } from "./binding-points.component";
import type { BindingNodeHandlers } from "./types";

export abstract class NodeBindingStrategy<T extends NodeBase = NodeBase> {
    public constructor(protected readonly handlers: BindingNodeHandlers) {}

    public abstract getReferencePoints(node: T): Point[];

    public ui(node: T) {
        const referencePoints = this.getReferencePoints(node);

        const handlers = {
            onMouseEnter: () => this.handlers.onMouseEnter?.(node.id),
            onMouseLeave: this.handlers.onMouseLeave,
            onMouseUp: (e: React.MouseEvent) => {
                this.handlers.onMouseUp?.({
                    relativeTo: node.id,
                    x: e.currentTarget.clientLeft,
                    y: e.currentTarget.clientTop,
                });
            },
        };

        return (
            <BindingPoints
                referencePoints={referencePoints}
                handlers={handlers}
            />
        );
    }
}
