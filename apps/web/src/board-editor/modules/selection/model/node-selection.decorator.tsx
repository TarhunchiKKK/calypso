import type React from "react";
import { type Decoratable, NodeDecorator } from "@/board-editor/core";
import type { NodeSelectionStrategy } from "./node-selection.strategy";

export class NodeSelectionDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: NodeSelectionStrategy
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
