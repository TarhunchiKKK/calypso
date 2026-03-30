import type { Boards } from "@repo/common";
import type { PropsWithChildren } from "react";
import type { NodeHandlers } from "@/board-editor/core";
import { calculateArrowHeadDimensions } from "./lib/calculate-arrow-dimensions.helper";
import { ArrowHeadsMap } from "./lib/arrow-heads.map";

type Props = PropsWithChildren<{
    node: Boards.ArrowNode;

    handlers: NodeHandlers;
}>;

export function ArrowNodeComponent({ node, handlers }: Props) {
    const { base, tip, left, right } = calculateArrowHeadDimensions(node);

    const renderArrowHead = ArrowHeadsMap[node.styles.angleType];

    return (
        <svg className="absolute left-0 top-0 pointer-events-none overflow-visible">
            <line
                x1={node.start.x}
                y1={node.start.y}
                x2={base.x}
                y2={base.y}
                stroke={node.styles.lineColor}
                strokeWidth={node.styles.lineWidth}
                {...handlers}
            />

            {renderArrowHead(node, handlers, { base, tip, left, right })}
        </svg>
    );
}
