export type ResizeDirection = "n" | "s" | "w" | "e" | "nw" | "ne" | "sw" | "se";

export type ResizeHandler = (nodeId: string, direction: ResizeDirection) => void;
