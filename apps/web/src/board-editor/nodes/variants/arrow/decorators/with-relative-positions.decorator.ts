import type { Boards } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import { Geometry } from "@/shared/lib/geometry";
import type { ArrowNodeWrapper } from "../arrow-node.wrapper";

export function withRelativePositions(nodes: Decoratable<Boards.NodeBase>[]) {
    const notArrows = Object.fromEntries(
        nodes.filter(node => node.type !== "arrow").map(node => [node.id, node.wrapper])
    );

    return nodes.map(node => {
        if (node.type === "arrow") {
            const data = (node as Decoratable<Boards.ArrowNode>).data;

            const start = data.start.relativeTo
                ? Geometry.addPoints(notArrows[data.start.relativeTo].rect, data.start)
                : data.start;

            const end = data.end.relativeTo
                ? Geometry.addPoints(notArrows[data.end.relativeTo].rect, data.end)
                : data.end;

            (node.wrapper as ArrowNodeWrapper).setAbsolutePosition({ start, end });
        }

        return node;
    });
}
