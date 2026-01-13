import { Decoratable, NodeDecorator, Rect } from "../../../core";
import { ResizeStrategy } from "./resize.strategy";

export class ResizableNodeDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: ResizeStrategy,
        size?: Rect
    ) {
        super(entry);

        if (size) {
            this.strategy.updateNode(this.entry.wrapper, size);
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
