import type { ArrowNode, NodeStyles } from "@repo/boards";
import clsx from "clsx";
import type { NodeHandlers, NodeUiSettings } from "@/board-editor/core";
import type { ArrowHeadDimensions } from "./calculate-arrow-dimensions.helper";

type CreateFunction = (node: ArrowNode, handlers: NodeHandlers, dimensions: ArrowHeadDimensions, uiSettings: NodeUiSettings) => React.ReactNode;

function getCommonStyles(node: ArrowNode, uiSettings: NodeUiSettings) {
    return {
        stroke: uiSettings.color ?? node.styles.lineColor,
        strokeWidth: node.styles.lineWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: clsx("cursor-pointer", uiSettings.noPointerEvents ? "pointer-events-none" : "pointer-events-auto")
    } as const;
}

export const ArrowHeadsMap: Record<NodeStyles["angleType"], CreateFunction> = {
    corner: (node, handlers, dimensions, uiSettings) => {
        return (
            <path
                d={`
                M ${dimensions.left.x} ${dimensions.left.y} 
                L ${dimensions.tip.x} ${dimensions.tip.y} 
                L ${dimensions.right.x} ${dimensions.right.y}
                `}
                fill="none"
                {...getCommonStyles(node, uiSettings)}
                {...handlers}
            />
        );
    },
    kite: (node, handlers, dimensions, uiSettings) => {
        return (
            <polygon
                points={`
                    ${dimensions.base.x},${dimensions.base.y}
                    ${dimensions.left.x},${dimensions.left.y}
                    ${dimensions.tip.x},${dimensions.tip.y}
                    ${dimensions.right.x},${dimensions.right.y}
                `}
                fill="none"
                {...getCommonStyles(node, uiSettings)}
                {...handlers}
            />
        );
    },
    "kite-filled": (node, handlers, dimensions, uiSettings) => {
        return (
            <polygon
                points={`
                    ${dimensions.base.x},${dimensions.base.y}
                    ${dimensions.left.x},${dimensions.left.y}
                    ${dimensions.tip.x},${dimensions.tip.y}
                    ${dimensions.right.x},${dimensions.right.y}
                `}
                fill={node.styles.lineColor}
                {...getCommonStyles(node, uiSettings)}
                {...handlers}
            />
        );
    },
    triangle: (node, handlers, dimensions, uiSettings) => {
        return (
            <polygon
                points={`
                    ${dimensions.left.x},${dimensions.left.y}
                    ${dimensions.tip.x},${dimensions.tip.y}
                    ${dimensions.right.x},${dimensions.right.y}
                `}
                fill="none"
                {...getCommonStyles(node, uiSettings)}
                {...handlers}
            />
        );
    },
    "triangle-filled": (node, handlers, dimensions, uiSettings) => {
        return (
            <polygon
                points={`
                    ${dimensions.left.x},${dimensions.left.y}
                    ${dimensions.tip.x},${dimensions.tip.y}
                    ${dimensions.right.x},${dimensions.right.y}
                `}
                fill={node.styles.lineColor}
                {...getCommonStyles(node, uiSettings)}
                {...handlers}
            />
        );
    }
};
