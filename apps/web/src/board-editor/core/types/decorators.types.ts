import type { Boards, Id } from "@repo/common";
import type { NodeWrapper } from "../classes/node-wrapper.class";

export type Decoratable<T extends Boards.NodeBase = Boards.NodeBase> = {
    get id(): Id;

    get type(): Boards.NodeTypes;

    get data(): T;

    set data(node: T);

    get wrapper(): NodeWrapper<T>;

    render(children?: React.ReactNode): React.ReactNode;
};
