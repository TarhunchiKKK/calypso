import type { Decoratable } from "@/board-editor/core";
import type { ResizeHandler } from "../types";

export abstract class ResizableNodeStrategy {
    public abstract ui(node: Decoratable, handler: ResizeHandler): React.ReactNode;
}
