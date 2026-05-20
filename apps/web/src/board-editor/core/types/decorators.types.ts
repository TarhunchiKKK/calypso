import type { NodeBase, NodeTypes } from "@repo/boards";
import type { Id } from "@repo/common";
import type { NodeWrapper } from "../classes/node-wrapper.class";

export type Decoratable<T extends NodeBase = NodeBase> = {
    get id(): Id;

    get type(): NodeTypes;

    get data(): T;

    set data(node: T);

    get wrapper(): NodeWrapper<T>;

    render(children?: React.ReactNode): React.ReactNode;
};
