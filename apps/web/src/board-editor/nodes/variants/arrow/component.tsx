import type { PropsWithChildren } from "react";
import type { NodeHandlers, NodeUiSettings } from "@/board-editor/core";
import type { ResolvedArrow } from "@/board-editor/modules/arrows-resolution/types";
import { ArrowHeadsMap } from "./lib/arrow-heads.map";
import { ArrowLinesMap } from "./lib/arrow-lines.map";
import { calculateArrowHeadDimensions } from "./lib/calculate-arrow-dimensions.helper";

type Props = PropsWithChildren<{
    node: ResolvedArrow;

    handlers: NodeHandlers;

    uiSettings: NodeUiSettings;
}>;

export function ArrowNodeComponent({ node, handlers, uiSettings, children }: Props) {
    const dimensions = calculateArrowHeadDimensions(node.styles.angleType, node.absolutePosition);

    const renderArrowHead = ArrowHeadsMap[node.styles.angleType];
    const renderLine = ArrowLinesMap[node.styles.lineType];

    return (
        <>
            {/*REFACTOR: move to separate component*/}
            <svg data-id={node.id} className="absolute left-0 top-0 overflow-visible pointer-events-none" {...handlers}>
                {renderLine(node, handlers, dimensions, uiSettings)}

                {renderArrowHead(node, handlers, dimensions, uiSettings)}
            </svg>

            {children}
        </>
    );
}
