import type { Boards } from "@repo/common";
import type { PropsWithChildren } from "react";
import type { NodeHandlers } from "@/board-editor/core";
import type { ArrowPosition } from "./lib/arrow.types";
import { ArrowHeadsMap } from "./lib/arrow-heads.map";
import { ArrowLinesMap } from "./lib/arrow-lines.map";
import { calculateArrowHeadDimensions } from "./lib/calculate-arrow-dimensions.helper";

type Props = PropsWithChildren<{
    node: Boards.ArrowNode;

    absolutePosition: ArrowPosition;

    handlers: NodeHandlers;
}>;

export function ArrowNodeComponent({ node, absolutePosition, handlers }: Props) {
    const dimensions = calculateArrowHeadDimensions(node.styles.angleType, absolutePosition);

    const renderArrowHead = ArrowHeadsMap[node.styles.angleType];
    const renderLine = ArrowLinesMap[node.styles.lineType];

    const withAbsolutePosition = { ...node, ...absolutePosition };

    return (
        <svg className="absolute left-0 top-0 pointer-events-none overflow-visible">
            {renderLine(withAbsolutePosition, handlers, dimensions)}

            {renderArrowHead(withAbsolutePosition, handlers, dimensions)}
        </svg>
    );
}
