import type { Point } from "@repo/common";

export type ArrowAbsolutePosition = {
    start: Point;

    end: Point;
};

export const ArrowSides = ["start", "end"] as const;
