import type { ArrowNode } from "@repo/boards";
import type { Point } from "@repo/common";

export const ArrowSides = ["start", "end"] as const;

export type ArrowAbsolutePosition = {
    start: Point;

    end: Point;
};

export type ResolvedArrow = ArrowNode & {
    absolutePosition: ArrowAbsolutePosition;
};

export function isResolvedArrow(arrow: ArrowNode): arrow is ResolvedArrow {
    const key: keyof ResolvedArrow = "absolutePosition";

    return key in arrow;
}
