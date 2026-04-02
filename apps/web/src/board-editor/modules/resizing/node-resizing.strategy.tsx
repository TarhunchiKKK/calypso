import type { Rect } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import type { ResizeHandler } from "./types";

export abstract class NodeResizingStrategy {
    public constructor(protected readonly handler?: ResizeHandler) {}

    public abstract updateNodeSizes(node: Decoratable, size: Rect): void;

    public abstract ui(node: Decoratable): React.ReactNode;
}
