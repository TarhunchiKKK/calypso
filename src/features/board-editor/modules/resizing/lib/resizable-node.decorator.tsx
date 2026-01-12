import { Decoratable, NodeDecorator } from "../../../core";
import { ResizeStrategy } from "./resize.strategy";

export class ResizableNodeDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
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
