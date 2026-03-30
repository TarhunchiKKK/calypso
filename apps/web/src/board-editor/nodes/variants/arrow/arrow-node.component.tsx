import type { NodeHandlers } from "@/board-editor/core";
import { Geometry } from "@/shared/lib/geometry";
import type { Boards } from "@repo/common";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    node: Boards.ArrowNode;

    handlers: NodeHandlers;
}>;

export function ArrowNodeComponent({ node, handlers }: Props) {
    const diff = Geometry.pointsDifference(node.start, node.end);
    const angle = Math.atan2(diff.y, diff.x);
    const arrowRightAngle = angle + Math.PI * (1 - 1 / 6);
    const arrowLeftAngle = angle - Math.PI * (1 - 1 / 6);
    const arrowRightDiff = [Math.cos(arrowRightAngle) * 10, Math.sin(arrowRightAngle) * 10];
    const arrowLeftDiff = [Math.cos(arrowLeftAngle) * 10, Math.sin(arrowLeftAngle) * 10];

    return (
        <svg className="absolute left-0 top-0 pointer-events-none overflow-visible">
            <path
                stroke="black"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...handlers}
                d={`
          M ${node.start.x} ${node.start.y} L ${node.end.x} ${node.end.y} 
          M ${node.end.x} ${node.end.y} L ${node.end.x + arrowRightDiff[0]} ${node.end.y + arrowRightDiff[1]} 
          L ${node.end.x + -5 * Math.cos(angle)} ${node.end.y + -5 * Math.sin(angle)}
          L ${node.end.x + arrowLeftDiff[0]} ${node.end.y + arrowLeftDiff[1]}
          L ${node.end.x} ${node.end.y}
          `}
            />
        </svg>
    );
}
