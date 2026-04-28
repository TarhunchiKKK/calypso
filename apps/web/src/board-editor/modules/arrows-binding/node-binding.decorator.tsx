import { type Decoratable, NodeDecorator } from "@/board-editor/core";
import type { BindableNodeStrategy } from "./node-binding.strategy";
import type { BindingNodeHandlers } from "./types";

export class BindableNodeDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: BindableNodeStrategy,
        protected readonly handler: BindingNodeHandlers["onMouseUp"]
    ) {
        super(entry);
    }

    public override render(children?: React.ReactNode) {
        return this.entry.render(
            <>
                {this.strategy.ui(this.entry.data, this.handler)}

                {children}
            </>
        );
    }
}
