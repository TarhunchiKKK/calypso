import { Geometry } from "@/shared/lib/geometry";
import type { ArrowNode } from "@repo/common/boards/index";

const ANGLE = 5 / 6;
const BASE_POINT_MULTIPLIER = 7;
const SIDE_LINE_MULTIPLIER = 15;

export function calculateArrowHeadDimensions(node: ArrowNode) {
    const diff = Geometry.pointsDifference(node.start, node.end);
    const angle = Math.atan2(diff.y, diff.x);
    const leftAngle = angle - ANGLE * Math.PI;
    const rightAngle = angle + ANGLE * Math.PI;

    const dimensions = {
        base: {
            x: 0,
            y: 0
        },
        tip: {
            x: node.end.x,
            y: node.end.y
        },
        left: {
            x: node.end.x + SIDE_LINE_MULTIPLIER * Math.cos(leftAngle),
            y: node.end.y + SIDE_LINE_MULTIPLIER * Math.sin(leftAngle)
        },
        right: {
            x: node.end.x + SIDE_LINE_MULTIPLIER * Math.cos(rightAngle),
            y: node.end.y + SIDE_LINE_MULTIPLIER * Math.sin(rightAngle)
        }
    };

    switch (node.styles.angleType) {
        case "kite":
        case "kite-filled":
            dimensions.base = {
                x: node.end.x - BASE_POINT_MULTIPLIER * Math.cos(angle),
                y: node.end.y - BASE_POINT_MULTIPLIER * Math.sin(angle)
            };
            break;
        case "triangle":
        case "triangle-filled":
            dimensions.base = Geometry.middlePoint(dimensions.left, dimensions.right);
            break;
        case "corner":
            dimensions.base = { ...node.end };
            break;
        default:
            throw new Error(`Unknown angle type: ${node.styles.angleType}`);
    }

    return dimensions;
}

export type ArrowHeadDimensions = ReturnType<typeof calculateArrowHeadDimensions>;
