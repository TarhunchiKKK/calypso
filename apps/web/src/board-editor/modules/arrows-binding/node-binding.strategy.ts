export abstract class NodeBindingStrategy {
    public constructor(
        protected readonly onBind: () => void,
        protected readonly onUnbind: () => void
    ) {}

    public abstract ui(): React.ReactNode;
}
