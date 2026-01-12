import React from "react";
import { NodeBase } from "../../core";

export abstract class EditNodeStrategy<T extends NodeBase = NodeBase> {
    public constructor(protected readonly handler: (node: T) => void) {}

    public abstract ui(node: T): React.ReactNode;
}
