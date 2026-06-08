import type { NodeBase } from "@lib/boards";
import { type Decoratable, NodeDecorator } from "../../core";
import type { NodeEditingStrategy } from "./node-editing.strategy";
import type { NodeEditingHandlers } from "./types";

export class NodeEditingDecorator<T extends NodeBase = NodeBase> extends NodeDecorator<T> {
    public constructor(
        protected readonly entry: Decoratable<T>,
        protected readonly strategy: NodeEditingStrategy,
        protected readonly handlers: NodeEditingHandlers
    ) {
        // NOTE: when node become editable it's content should not be displayed
        entry.wrapper.setUiSetting("showContent", false);

        super(entry);
    }

    public override render(children?: React.ReactNode) {
        return this.entry.render(
            <>
                {this.strategy.ui(this.entry, this.handlers)}

                {children}
            </>
        );
    }
}
