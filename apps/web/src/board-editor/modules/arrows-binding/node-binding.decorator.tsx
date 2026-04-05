import { type Decoratable, NodeDecorator } from "@/board-editor/core";
import type { NodeBindingStrategy } from "./node-binding.strategy";

export class NodeBindingDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: NodeBindingStrategy
    ) {
        super(entry);
    }

    public override render(children?: React.ReactNode) {
        return this.entry.render(
            <>
                {this.strategy.ui(this.entry.data)}

                {children}
            </>
        );
    }
}
