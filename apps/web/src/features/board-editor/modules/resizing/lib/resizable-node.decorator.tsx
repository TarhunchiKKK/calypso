import { type Decoratable, NodeDecorator, type Rect } from "../../../core";
import type { NodeResizingStrategy } from "./node-resizing.strategy";

export class ResizableNodeDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: NodeResizingStrategy,
        size?: Rect
    ) {
        super(entry);

        if (size) {
            this.strategy.updateNodeSizes(this.entry.wrapper, size);
        }
    }

    public override render(children?: React.ReactNode) {
        return this.entry.render(
            <>
                {this.strategy.ui()}

                {children}
            </>
        );
    }
}
