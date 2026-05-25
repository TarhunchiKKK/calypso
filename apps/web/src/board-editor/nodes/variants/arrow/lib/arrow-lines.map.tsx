import type { NodeStyles } from "@repo/boards";
import clsx from "clsx";
import type { NodeHandlers, NodeUiSettings } from "@/board-editor/core";
import type { ResolvedArrow } from "@/board-editor/modules/arrows-resolution/types";
import type { ArrowHeadDimensions } from "./calculate-arrow-dimensions.helper";

type CreateFunction = (node: ResolvedArrow, handlers: NodeHandlers, dimensions: ArrowHeadDimensions, uiSettings: NodeUiSettings) => React.ReactNode;

function getCommonStyles(node: ResolvedArrow, uiSettings: NodeUiSettings) {
    return {
        stroke: uiSettings.color ?? node.styles.lineColor,
        strokeWidth: node.styles.lineWidth,
        className: clsx("cursor-pointer", uiSettings.noPointerEvents ? "pointer-events-none" : "pointer-events-auto")
    };
}

export const ArrowLinesMap: Record<NodeStyles["lineType"], CreateFunction> = {
    solid: (node, handlers, dimensions, uiSettings) => {
        return (
            <line
                x1={node.absolutePosition.start.x}
                y1={node.absolutePosition.start.y}
                x2={dimensions.base.x}
                y2={dimensions.base.y}
                {...getCommonStyles(node, uiSettings)}
                {...handlers}
            />
        );
    },
    dashed: (node, handlers, dimensions, uiSettings) => {
        return (
            <line
                x1={node.absolutePosition.start.x}
                y1={node.absolutePosition.start.y}
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
                x1={node.absolutePosition.start.x}
                y1={node.absolutePosition.start.y}
                x2={dimensions.base.x}
                y2={dimensions.base.y}
                strokeDasharray={`${node.styles.lineWidth} ${node.styles.lineWidth * 2}`}
                {...getCommonStyles(node, uiSettings)}
                {...handlers}
            />
        );
    }
};
