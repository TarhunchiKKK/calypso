import { NodeBase } from "./node";

export type Decoratoratable<T extends NodeBase> = {
    get id(): string;

    get type(): string;

    get data(): T;

    render(): React.ReactNode;
};
