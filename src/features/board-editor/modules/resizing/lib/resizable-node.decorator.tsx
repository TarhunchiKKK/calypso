import { Decoratable, NodeDecorator } from "../../../core";
import { AnyNode } from "../../../nodes";
import { ResizeStrategy } from "./resize.strategy";

export class ResizableNodeDecorator extends NodeDecorator<AnyNode> {
    public constructor(
        protected readonly entry: Decoratable<AnyNode>,
        protected readonly strategy: ResizeStrategy
    ) {
        super(entry);
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
