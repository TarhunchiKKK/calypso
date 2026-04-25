import type { NodeBase } from "@repo/boards-common";

export type UpdateFn = (node: NodeBase) => NodeBase;

export type ElementProps = {
    update: (fn: UpdateFn) => void;
};
