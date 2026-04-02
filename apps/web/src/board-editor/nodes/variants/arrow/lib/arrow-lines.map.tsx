import type { ArrowNode, NodeStyles } from "@repo/boards-common";
import type { NodeHandlers } from "@/board-editor/core";
import type { ArrowHeadDimensions } from "./calculate-arrow-dimensions.helper";

type ArrowLineVariants = NodeStyles["lineType"];

type CreateFunction = (node: ArrowNode, handlers: NodeHandlers, dimensions: ArrowHeadDimensions) => React.ReactNode;

export const ArrowLinesMap: Record<ArrowLineVariants, CreateFunction> = {
    solid: (node, handlers, dimensions) => {
        return (
            <line
                x1={node.start.x}
                y1={node.start.y}
                x2={dimensions.base.x}
                y2={dimensions.base.y}
                stroke={node.styles.lineColor}
                strokeWidth={node.styles.lineWidth}
                {...handlers}
            />
        );
    },
    dashed: (node, handlers, dimensions) => {
        return (
            <line
                x1={node.start.x}
                y1={node.start.y}
                x2={dimensions.base.x}
                y2={dimensions.base.y}
                stroke={node.styles.lineColor}
                strokeWidth={node.styles.lineWidth}
                strokeDasharray={`${node.styles.lineWidth * 4} ${node.styles.lineWidth * 2}`}
                {...handlers}
            />
        );
    },
    dotted: (node, handlers, dimensions) => {
        return (
            <line
                x1={node.start.x}
                y1={node.start.y}
                x2={dimensions.base.x}
                y2={dimensions.base.y}
                stroke={node.styles.lineColor}
                strokeWidth={node.styles.lineWidth}
                strokeDasharray={`${node.styles.lineWidth} ${node.styles.lineWidth * 2}`}
                {...handlers}
            />
        );
    }
};
