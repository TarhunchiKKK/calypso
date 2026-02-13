import type { Offset } from "@repo/common";
import type { NodeWrapper } from "../../core";

export abstract class NodeDraggingStrategy {
    public abstract updateNodePosition(wrapper: NodeWrapper, offset: Offset): void;
}
