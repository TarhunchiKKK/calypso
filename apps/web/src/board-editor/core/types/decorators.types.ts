import type { NodeBase } from "@lib/boards";
import type { Id } from "@lib/common";
import type { NodeWrapper } from "../classes/node-wrapper.class";

export type Decoratable<T extends NodeBase = NodeBase> = {
    get id(): Id;

    get data(): T;

    set data(node: T);

    get wrapper(): NodeWrapper<T>;

    render(children?: React.ReactNode): React.ReactNode;
};
