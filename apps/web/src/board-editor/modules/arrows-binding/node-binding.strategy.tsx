import type { Boards, Point } from "@repo/common";
import type { BindingNodeHandlers } from "./types";
import { BindingPoints } from "./binding-points.component";

export abstract class NodeBindingStrategy<T extends Boards.NodeBase = Boards.NodeBase> {
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
