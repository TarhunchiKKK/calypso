import type { NodeWrapper } from "@/features/board-editor/core";
import type { ResizeHandler } from "../types";
import type { Rect } from "@/shared/lib/geometry";

export abstract class NodeResizingStrategy {
    public constructor(protected readonly handler?: ResizeHandler) {}

    public abstract updateNodeSizes(wrapper: NodeWrapper, size: Rect): void;

    public abstract ui(): React.ReactNode;
}
