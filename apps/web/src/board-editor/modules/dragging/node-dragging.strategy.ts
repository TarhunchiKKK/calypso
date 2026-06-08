import type { Offset } from "@lib/common";
import type { Decoratable } from "../../core";

export abstract class NodeDraggingStrategy {
    public abstract updateNodePosition(wrapper: Decoratable, offset: Offset): void;
}
