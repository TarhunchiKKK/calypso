import type { Boards } from "@repo/common";

export type UpdateFn = (node: Boards.NodeBase) => Boards.NodeBase;
