import { type Decoratable, NodeDecorator } from "@/board-editor/core";
import type { BindableNodeStrategy } from "../strategies/bindable-node.strategy";
import type { BindingNodeHandlers } from "../types";

export class BindableNodeDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: BindableNodeStrategy,
        protected readonly handlers: BindingNodeHandlers,
        protected readonly active: boolean
    ) {
        super(entry);

        this.strategy.updateNode(this.entry, handlers, this.active);
    }

    public override render(children?: React.ReactNode) {
        return this.entry.render(
            <>
                {this.active && this.strategy.ui(this.entry.data, this.handlers)}

                {children}
            </>
        );
    }
}
