import type { Boards } from "@repo/common";
import type { PropsWithChildren } from "react";
import type { NodeHandlers } from "@/board-editor/core";
import { ArrowHeadsMap } from "./lib/arrow-heads.map";
import { ArrowLinesMap } from "./lib/arrow-lines.map";
import { calculateArrowHeadDimensions } from "./lib/calculate-arrow-dimensions.helper";

type Props = PropsWithChildren<{
    node: Boards.ArrowNode;

    handlers: NodeHandlers;
}>;

export function ArrowNodeComponent({ node, handlers }: Props) {
    const dimensions = calculateArrowHeadDimensions(node);

    const renderArrowHead = ArrowHeadsMap[node.styles.angleType];
    const renderLine = ArrowLinesMap[node.styles.lineType];

    return (
        <svg className="absolute left-0 top-0 pointer-events-none overflow-visible">
            {renderLine(node, handlers, dimensions)}

            {renderArrowHead(node, handlers, dimensions)}
        </svg>
    );
}
