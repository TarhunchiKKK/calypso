import { type Decoratable, NodeDecorator } from "@/board-editor/core";
import type { NodeBindingStrategy } from "../strategies/node-binding.strategy";

export class NodeBindingDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: NodeBindingStrategy
    ) {
        super(entry);

        this.strategy.updateNode(this.entry)
    }

    public override render(children?: React.ReactNode): React.ReactNode {
        return this.entry.render(
            <>
                {this.strategy.ui(this.entry.data)}

                {children}
            </>
        );
    }
}
