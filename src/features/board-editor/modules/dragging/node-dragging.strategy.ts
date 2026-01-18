import type { NodeWrapper, Offset } from "../../core";

export abstract class NodeDraggingStrategy {
    public abstract updateNodePosition(
        wrapper: NodeWrapper,
        offset: Offset
    ): void;
}
