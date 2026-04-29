import type React from "react";
import type { Decoratable } from "@/board-editor/core";

export abstract class NodeBindingStrategy {
    public abstract updateNode(entry: Decoratable): void;

    public abstract ui(entry: Decoratable): React.ReactNode;
}
