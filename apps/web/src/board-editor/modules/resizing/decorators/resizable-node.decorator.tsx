import { type Decoratable, NodeDecorator } from "@/board-editor/core";
import type { ResizableNodeStrategy } from "../strategies/resizable-node.strategy";
import type { ResizeHandler } from "../types";

export class ResizableNodeDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: ResizableNodeStrategy,
        protected readonly handler: ResizeHandler
    ) {
        super(entry);
    }

    public override render(children?: React.ReactNode) {
        return this.entry.render(
            <>
                {this.strategy.ui(this.entry, this.handler)}

                {children}
            </>
        );
    }
}
