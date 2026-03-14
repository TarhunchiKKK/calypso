import type { Offset } from "@/shared/lib/geometry";
import { type Decoratable, NodeDecorator } from "../../core";
import type { NodeDraggingStrategy } from "./node-dragging.strategy";

export class DraggableNodeDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: NodeDraggingStrategy,
        protected readonly offset?: Offset
    ) {
        super(entry);

        if (offset) {
            this.strategy.updateNodePosition(entry.wrapper, offset);
        }
    }

    public override render(children?: React.ReactNode) {
        return this.entry.render(children);
    }
}
