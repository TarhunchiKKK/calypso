import type { Rect } from "@repo/common";
import type { NodeWrapper } from "@/features/board-editor/core";
import type { ResizeHandler } from "../types";

export abstract class NodeResizingStrategy {
    public constructor(protected readonly handler?: ResizeHandler) {}

    public abstract updateNodeSizes(wrapper: NodeWrapper, size: Rect): void;

    public abstract ui(): React.ReactNode;
}
