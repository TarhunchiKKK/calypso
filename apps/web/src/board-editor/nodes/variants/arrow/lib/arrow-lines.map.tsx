import type { ArrowNode, NodeStyles } from "@repo/boards-common";
import clsx from "clsx";
import type { NodeHandlers, NodeUiSettings } from "@/board-editor/core";
import type { ArrowHeadDimensions } from "./calculate-arrow-dimensions.helper";

type CreateFunction = (node: ArrowNode, handlers: NodeHandlers, dimensions: ArrowHeadDimensions, uiSettings: NodeUiSettings) => React.ReactNode;

function getCommonStyles(node: ArrowNode, uiSettings: NodeUiSettings) {
    return {
        stroke: node.styles.lineColor,
        strokeWidth: node.styles.lineWidth,
        className: clsx("cursor-pointer", uiSettings.noPointerEvents ? "pointer-events-none" : "pointer-events-auto")
    };
}

export const ArrowLinesMap: Record<NodeStyles["lineType"], CreateFunction> = {
    solid: (node, handlers, dimensions, uiSettings) => {
        return <line x1={node.start.x} y1={node.start.y} x2={dimensions.base.x} y2={dimensions.base.y} {...getCommonStyles(node, uiSettings)} {...handlers} />;
    },
    dashed: (node, handlers, dimensions, uiSettings) => {
        return (
            <line
                x1={node.start.x}
                y1={node.start.y}
                x2={dimensions.base.x}
                y2={dimensions.base.y}
                strokeDasharray={`${node.styles.lineWidth * 4} ${node.styles.lineWidth * 2}`}
                {...getCommonStyles(node, uiSettings)}
                {...handlers}
            />
        );
    },
    dotted: (node, handlers, dimensions, uiSettings) => {
        return (
            <line
                x1={node.start.x}
                y1={node.start.y}
                x2={dimensions.base.x}
                y2={dimensions.base.y}
                strokeDasharray={`${node.styles.lineWidth} ${node.styles.lineWidth * 2}`}
                {...getCommonStyles(node, uiSettings)}
                {...handlers}
            />
        );
    }
};
