import { NodeWrapper, Rect } from "@/features/board-editor/core";
import { ResizeHandler } from "../types";

export abstract class ResizeStrategy {
    public constructor(protected readonly handler?: ResizeHandler) {}

    public abstract updateNode(wrapper: NodeWrapper, size: Rect): void;

    public abstract ui(): React.ReactNode;
}
