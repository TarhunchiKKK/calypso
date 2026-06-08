import type { Offset } from "@lib/common";
import { type Decoratable, NodeDecorator } from "../../core";
import type { NodeDraggingStrategy } from "./node-dragging.strategy";

export class NodeDraggingDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: NodeDraggingStrategy,
        protected readonly offset?: Offset
    ) {
        super(entry);

        if (offset) {
            this.strategy.updateNodePosition(entry, offset);
        }
    }

    public override render(children?: React.ReactNode) {
        return this.entry.render(children);
    }
}
