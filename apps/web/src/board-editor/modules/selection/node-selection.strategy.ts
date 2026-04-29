import type { Decoratable } from "@/board-editor/core";

export abstract class NodeSelectionStrategy {
    public abstract ui(node: Decoratable): React.ReactNode;
}
