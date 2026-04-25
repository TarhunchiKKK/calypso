import type { Decoratable } from "@/board-editor/core";

export abstract class NodeLockingStrategy {
    public abstract ui(node: Decoratable): React.ReactNode;
}
