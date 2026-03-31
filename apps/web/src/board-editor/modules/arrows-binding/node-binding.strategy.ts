import type { Boards } from "@repo/common";

export abstract class NodeBindingStrategy<T extends Boards.NodeBase = Boards.NodeBase> {
    public constructor(
        protected readonly node: T,
        protected readonly onBind: () => void,
        protected readonly onUnbind: () => void
    ) {}

    public abstract ui(): React.ReactNode;
}
