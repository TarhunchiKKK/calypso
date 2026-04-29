import type { ArrowNode } from "@repo/boards-common";
import type { PropsWithChildren } from "react";
import type { NodeHandlers, NodeUiSettings } from "@/board-editor/core";
import type { ArrowPosition } from "./lib/arrow.types";
import { ArrowHeadsMap } from "./lib/arrow-heads.map";
import { ArrowLinesMap } from "./lib/arrow-lines.map";
import { calculateArrowHeadDimensions } from "./lib/calculate-arrow-dimensions.helper";

type Props = PropsWithChildren<{
    node: ArrowNode;

    absolutePosition: ArrowPosition;

    handlers: NodeHandlers;

    uiSettings: NodeUiSettings;
}>;

export function ArrowNodeComponent({ node, absolutePosition, handlers, uiSettings, children }: Props) {
    const dimensions = calculateArrowHeadDimensions(node.styles.angleType, absolutePosition);

    const renderArrowHead = ArrowHeadsMap[node.styles.angleType];
    const renderLine = ArrowLinesMap[node.styles.lineType];

    const withAbsolutePosition = { ...node, ...absolutePosition };

    return (
        <>
            <svg data-id={node.id} className="absolute left-0 top-0 overflow-visible pointer-events-none" {...handlers}>
                {renderLine(withAbsolutePosition, handlers, dimensions, uiSettings)}

                {renderArrowHead(withAbsolutePosition, handlers, dimensions, uiSettings)}
            </svg>

            {children}
        </>
    );
}
