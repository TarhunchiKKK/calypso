import type { Rect } from "@repo/common";
import { type Decoratable, NodeDecorator } from "../../core";
import type { NodeResizingStrategy } from "./node-resizing.strategy";

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
        return this.entry.render(
            <>
                {this.strategy.ui(this.entry)}

                {children}
            </>
        );
    }
}
