import type { Rect } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";

export abstract class NodeResizingStrategy {
    public abstract updateNodeSizes(node: Decoratable, size: Rect): void;
}
