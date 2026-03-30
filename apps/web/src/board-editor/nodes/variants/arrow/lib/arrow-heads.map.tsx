import type { Boards } from "@repo/common";
import type { NodeHandlers } from "@/board-editor/core";
import type { ArrowHeadDimensions } from "./calculate-arrow-dimensions.helper";

type ArrowHeadVariants = Boards.NodeStyles["angleType"];

type CreateFunction = (
    node: Boards.ArrowNode,
    handlers: NodeHandlers,
    dimensions: ArrowHeadDimensions
) => React.ReactNode;

export const ArrowHeadsMap: Record<ArrowHeadVariants, CreateFunction> = {
    corner: (node, handlers, dimensions) => {
        return (
            <path
                stroke={node.styles.lineColor}
                strokeWidth={node.styles.lineWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...handlers}
                d={`
          M ${dimensions.left.x} ${dimensions.left.y} 
          L ${dimensions.tip.x} ${dimensions.tip.y} 
          L ${dimensions.right.x} ${dimensions.right.y}
          `}
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
                {...handlers}
            />
        );
    }
};
