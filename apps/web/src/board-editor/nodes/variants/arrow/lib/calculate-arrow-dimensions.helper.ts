import type { NodeStyles } from "@repo/boards-common";
import { Geometry } from "@/shared/lib/geometry";
import type { ArrowPosition } from "./arrow.types";

const ANGLE = 5 / 6;
const BASE_POINT_MULTIPLIER = 7;
const SIDE_LINE_MULTIPLIER = 15;

export function calculateArrowHeadDimensions(angleType: NodeStyles["angleType"], position: ArrowPosition) {
    const diff = Geometry.pointsDifference(position.start, position.end);
    const angle = Math.atan2(diff.y, diff.x);
    const leftAngle = angle - ANGLE * Math.PI;
    const rightAngle = angle + ANGLE * Math.PI;

    const dimensions = {
        base: {
            x: 0,
            y: 0
        },
        tip: {
            x: position.end.x,
            y: position.end.y
        },
        left: {
            x: position.end.x + SIDE_LINE_MULTIPLIER * Math.cos(leftAngle),
            y: position.end.y + SIDE_LINE_MULTIPLIER * Math.sin(leftAngle)
        },
        right: {
            x: position.end.x + SIDE_LINE_MULTIPLIER * Math.cos(rightAngle),
            y: position.end.y + SIDE_LINE_MULTIPLIER * Math.sin(rightAngle)
        }
    };

    switch (angleType) {
        case "kite":
        case "kite-filled":
            dimensions.base = {
                x: position.end.x - BASE_POINT_MULTIPLIER * Math.cos(angle),
                y: position.end.y - BASE_POINT_MULTIPLIER * Math.sin(angle)
            };
            break;
        case "triangle":
        case "triangle-filled":
            dimensions.base = Geometry.middlePoint(dimensions.left, dimensions.right);
            break;
        case "corner":
            dimensions.base = { ...position.end };
            break;
        default:
            throw new Error(`Unknown angle type: ${angleType}`);
    }

    return dimensions;
}

export type ArrowHeadDimensions = ReturnType<typeof calculateArrowHeadDimensions>;
