import type { Rect } from "@lib/common";
import { type Decoratable, NodeDecorator } from "../../../core";
import type { NodeResizingStrategy } from "../strategies/node-resizing.strategy";

export class NodeResizingDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: NodeResizingStrategy,
        size?: Rect
    ) {
        super(entry);

        if (size) {
            this.strategy.updateNodeSizes(this.entry, size);
        }
    }

    public override render(children?: React.ReactNode) {
        return this.entry.render(children);
    }
}
