import type { Id } from "@repo/common";

export type ResizeDirection = "n" | "s" | "w" | "e" | "nw" | "ne" | "sw" | "se";

export type ResizeHandler = (nodeId: Id, direction: ResizeDirection) => void;
