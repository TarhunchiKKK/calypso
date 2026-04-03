import { type Decoratable, NodeDecorator } from "@/board-editor/core";
import type { ResizableNodeStrategy } from "../strategies/resizable-node.strategy";

export class ResizableNodeDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: ResizableNodeStrategy
    ) {
        super(entry);
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
