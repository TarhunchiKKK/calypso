import type { NodeWrapper, Rect } from "@/features/board-editor/core";
import type { ResizeHandler } from "../types";

export abstract class ResizeStrategy {
    public constructor(protected readonly handler?: ResizeHandler) {}

    public abstract updateNode(wrapper: NodeWrapper, size: Rect): void;

    public abstract ui(): React.ReactNode;
}
