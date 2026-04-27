import type { ArrowNode, NodeStyles } from "@repo/boards-common";
import type { NodeHandlers } from "@/board-editor/core";
import type { ArrowHeadDimensions } from "./calculate-arrow-dimensions.helper";

type ArrowHeadVariants = NodeStyles["angleType"];

type CreateFunction = (node: ArrowNode, handlers: NodeHandlers, dimensions: ArrowHeadDimensions) => React.ReactNode;

const commonClassNames = "cursor-pointer pointer-events-auto";

// REFACTOR: move common props to function
export const ArrowHeadsMap: Record<ArrowHeadVariants, CreateFunction> = {
    corner: (node, handlers, dimensions) => {
        return (
            <path
                stroke={node.styles.lineColor}
                strokeWidth={node.styles.lineWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                d={`
                    M ${dimensions.left.x} ${dimensions.left.y} 
                    L ${dimensions.tip.x} ${dimensions.tip.y} 
                    L ${dimensions.right.x} ${dimensions.right.y}
                    `}
                className={commonClassNames}
                {...handlers}
            />
        );
    },
    kite: (node, handlers, dimensions) => {
        return (
            <polygon
                points={`
                    ${dimensions.base.x},${dimensions.base.y}
                    ${dimensions.left.x},${dimensions.left.y}
                    ${dimensions.tip.x},${dimensions.tip.y}
                    ${dimensions.right.x},${dimensions.right.y}
                `}
                stroke={node.styles.lineColor}
                strokeWidth={node.styles.lineWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={commonClassNames}
                {...handlers}
            />
        );
    },
    "kite-filled": (node, handlers, dimensions) => {
        return (
            <polygon
                points={`
                    ${dimensions.base.x},${dimensions.base.y}
                    ${dimensions.left.x},${dimensions.left.y}
                    ${dimensions.tip.x},${dimensions.tip.y}
                    ${dimensions.right.x},${dimensions.right.y}
                `}
                stroke={node.styles.lineColor}
                strokeWidth={node.styles.lineWidth}
                fill={node.styles.lineColor}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={commonClassNames}
                {...handlers}
            />
        );
    },
    triangle: (node, handlers, dimensions) => {
        return (
            <polygon
                points={`
                    ${dimensions.left.x},${dimensions.left.y}
                    ${dimensions.tip.x},${dimensions.tip.y}
                    ${dimensions.right.x},${dimensions.right.y}
                `}
                stroke={node.styles.lineColor}
                strokeWidth={node.styles.lineWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={commonClassNames}
                {...handlers}
            />
        );
    },
    "triangle-filled": (node, handlers, dimensions) => {
        return (
            <polygon
                points={`
                    ${dimensions.left.x},${dimensions.left.y}
                    ${dimensions.tip.x},${dimensions.tip.y}
                    ${dimensions.right.x},${dimensions.right.y}
                `}
                stroke={node.styles.lineColor}
                strokeWidth={node.styles.lineWidth}
                fill={node.styles.lineColor}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={commonClassNames}
                {...handlers}
            />
        );
    }
};
