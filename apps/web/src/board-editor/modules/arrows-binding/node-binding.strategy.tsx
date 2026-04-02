import type { NodeBase } from "@repo/boards-common";
import type { Point } from "@repo/common";
import { BindingPoints } from "./binding-points.component";
import type { BindingNodeHandlers } from "./types";

export abstract class NodeBindingStrategy<T extends NodeBase = NodeBase> {
    public constructor(
        protected readonly node: T,
        protected readonly handlers: BindingNodeHandlers
    ) {}

    public abstract getReferencePoints(): Point[];

    public ui() {
        const referencePoints = this.getReferencePoints();

        const handlers = {
            onMouseEnter: () => this.handlers.onMouseEnter?.(this.node.id),
            onMouseLeave: this.handlers.onMouseLeave,
            onMouseUp: (e: React.MouseEvent) => {
                this.handlers.onMouseUp?.({
                    relativeTo: this.node.id,
                    x: e.currentTarget.clientLeft,
                    y: e.currentTarget.clientTop
                });
            }
        };

        return <BindingPoints referencePoints={referencePoints} handlers={handlers} />;
    }
}
