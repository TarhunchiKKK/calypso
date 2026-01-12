import { Decoratable, NodeDecorator } from "../../core";
import { EditNodeStrategy } from "./edit-node.strategy";

export class EditableNodeDecorator<Data> extends NodeDecorator {
    public constructor(
        protected readonly entry: Decoratable,
        protected readonly strategy: EditNodeStrategy<Data>
    ) {
        super(entry);
    }

    public override render(children?: React.ReactNode) {
        // TODO: implementation
        return children;
    }
}
