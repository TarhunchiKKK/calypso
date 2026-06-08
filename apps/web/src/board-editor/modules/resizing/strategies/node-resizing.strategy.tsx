import type { Rect } from "@lib/common";
import type { Decoratable } from "@/board-editor/core";

export abstract class NodeResizingStrategy {
    public abstract updateNodeSizes(node: Decoratable, size: Rect): void;
}
