import type { NodeBase } from "../../core";

export abstract class NodeEditingStrategy {
    public constructor(protected readonly handler: (node: NodeBase) => void) {}

    public abstract ui(node: NodeBase): React.ReactNode;
}

export class EmptyNodeEditingStrategy extends NodeEditingStrategy {
    public override ui() {
        return null;
    }
}
