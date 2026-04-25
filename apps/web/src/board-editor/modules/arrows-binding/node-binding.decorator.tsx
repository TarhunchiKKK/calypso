import { type Decoratable, NodeDecorator } from "@/board-editor/core";
import type { NodeBindingStrategy } from "./node-binding.strategy";
import type { BindingNodeHandlers } from "./types";

export class NodeBindingDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: NodeBindingStrategy,
        protected readonly handlers: BindingNodeHandlers
    ) {
        super(entry);
    }

    public override render(children?: React.ReactNode) {
        return this.entry.render(
            <>
                {this.strategy.ui(this.entry.data, this.handlers)}

                {children}
            </>
        );
    }
}
