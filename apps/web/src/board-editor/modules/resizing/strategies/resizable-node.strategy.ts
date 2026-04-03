import type { Decoratable } from "@/board-editor/core";
import type { ResizeHandler } from "../types";

export abstract class ResizableNodeStrategy {
    public constructor(protected readonly handler: ResizeHandler) {}

    public abstract ui(node: Decoratable): React.ReactNode;
}
