import React from "react";
import { NodeBase } from "./node";
import { NodeWrapper } from "../classes/node-wrappper";

export type Decoratoratable<T extends NodeBase = NodeBase> = {
    get id(): string;

    get type(): string;

    get data(): T;

    get wrapper(): NodeWrapper<T>;

    render(children?: React.ReactNode): React.ReactNode;
};
