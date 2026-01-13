import React from "react";
import { NodeBase, NodeTypes } from "./node";
import { NodeWrapper } from "../classes/node-wrappper";

export type Decoratable<T extends NodeBase = NodeBase> = {
    get id(): string;

    get type(): NodeTypes;

    get data(): T;

    set data(node: T);

    get wrapper(): NodeWrapper<T>;

    render(children?: React.ReactNode): React.ReactNode;
};
