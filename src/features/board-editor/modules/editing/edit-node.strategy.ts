import React from "react";
import { NodeBase } from "../../core";

export abstract class EditNodeStrategy {
    public constructor(protected readonly handler: (node: NodeBase) => void) {}

    public abstract ui(node: NodeBase): React.ReactNode;
}
