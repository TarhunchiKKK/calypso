import type { NodeBase } from "@/entities/nodes";
import { type Decoratable, NodeDecorator } from "../../core";
import type { NodeEditingStrategy } from "./node-editing.strategy";

export class EditableNodeDecorator<T extends NodeBase = NodeBase> extends NodeDecorator<T> {
    public constructor(
        protected readonly entry: Decoratable<T>,
        protected readonly strategy: NodeEditingStrategy
    ) {
        // NOTE: when node become editable it's content should not be displayed
        entry.wrapper.hideContent();

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
