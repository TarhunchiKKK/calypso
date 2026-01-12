import React from "react";
import { NodeBase } from "./node";
import { NodeWrapper } from "../classes/node-wrappper";
import { NodeTypes } from "../../nodes";

export type Decoratable<T extends NodeBase = NodeBase> = {
    get id(): string;

    get type(): NodeTypes;

    get data(): T;

    get wrapper(): NodeWrapper<T>;

    render(children?: React.ReactNode): React.ReactNode;
};
