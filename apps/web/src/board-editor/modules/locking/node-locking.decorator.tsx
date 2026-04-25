import type React from "react";
import { type Decoratable, NodeDecorator } from "../../core";
import type { NodeLockingStrategy } from "./node-locking.strategy";

export class NodeLockingDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: NodeLockingStrategy
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
