import type { NodeWrapper, Offset } from "../../core";

export abstract class DraggingStrategy {
    public abstract updateNodePosition(wrapper: NodeWrapper, offset: Offset): void;
}
