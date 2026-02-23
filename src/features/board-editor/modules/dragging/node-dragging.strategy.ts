import type { Offset } from "@/shared/lib/geometry";
import type { NodeWrapper } from "../../core";

export abstract class NodeDraggingStrategy {
    public abstract updateNodePosition(wrapper: NodeWrapper, offset: Offset): void;
}
