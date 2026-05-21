import type { NodeBase, NodeStyles } from "@repo/boards";

export type UpdateFn = (node: NodeBase) => NodeBase;

export type ElementProps<Key extends keyof NodeStyles> = {
    update: (fn: UpdateFn) => void;

    values: NodeStyles[Key][];
};
