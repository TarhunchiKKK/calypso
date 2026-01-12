import React from "react";
import { NodeBase, NodeTypes } from "./node";

export type Decoratable<T extends NodeBase = NodeBase> = {
    get id(): string;

    get type(): NodeTypes;

    get data(): T;

    render(children?: React.ReactNode): React.ReactNode;
};
