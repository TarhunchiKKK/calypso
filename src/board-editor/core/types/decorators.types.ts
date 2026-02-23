import type { NodeWrapper } from "../classes/node-wrapper.class";
import type { NodeBase, NodeTypes } from "./node.types";

export type Decoratable<T extends NodeBase = NodeBase> = {
    get id(): string;

    get type(): NodeTypes;

    get data(): T;

    set data(node: T);

    get wrapper(): NodeWrapper<T>;

    render(children?: React.ReactNode): React.ReactNode;
};
