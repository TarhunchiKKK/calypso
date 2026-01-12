import { Decoratable, NodeDecorator } from "../../core";
import { EditNodeStrategy } from "./edit-node.strategy";

export class EditableNodeDecorator extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: EditNodeStrategy
    ) {
        super(entry);
    }

    public override render(children?: React.ReactNode) {
        // TODO: implementation
        return children;
    }
}
