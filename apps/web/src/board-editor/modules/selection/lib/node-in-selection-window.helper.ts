import type { ArrowNode, NodeBase } from "@repo/boards-common";
import type { Point, Rect } from "@repo/common";
import { NodeRectsFactory } from "@/entities/nodes";
import { Geometry } from "@/shared/lib/geometry";

function linesIntersecting(line1: { start: Point; end: Point }, line2: { start: Point; end: Point }): boolean {
    const ccw = (a: Point, b: Point, c: Point) => {
        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
    };

    return (
        ccw(line1.start, line2.start, line2.end) !== ccw(line1.end, line2.start, line2.end) &&
        ccw(line1.start, line1.end, line2.start) !== ccw(line1.start, line1.end, line2.end)
    );
}

function lineInRect(line: { start: Point; end: Point }, rect: Rect): boolean {
    if (Geometry.pointInRect(line.start, rect) || Geometry.pointInRect(line.end, rect)) {
        return true;
    }

    const extremePoints = {
        tl: { x: rect.x, y: rect.y },
        tr: { x: rect.x + rect.width, y: rect.y },
        bl: { x: rect.x, y: rect.y + rect.height },
        br: { x: rect.x + rect.width, y: rect.y + rect.height }
    };

    return (
        linesIntersecting(line, { start: extremePoints.tl, end: extremePoints.tr }) ||
        linesIntersecting(line, { start: extremePoints.tr, end: extremePoints.br }) ||
        linesIntersecting(line, { start: extremePoints.bl, end: extremePoints.br }) ||
        linesIntersecting(line, { start: extremePoints.tl, end: extremePoints.bl })
    );
}

// TEST
export function nodeInSelectionWindow(node: NodeBase, selectionWindow: Rect): boolean {
    const nodeRect = NodeRectsFactory.rect(node);

    switch (node.type) {
        case "sticker":
        case "text":
        case "shape":
        case "media":
        case "note":
        case "drawing":
            return Geometry.rectsIntersecting(nodeRect, selectionWindow);
        case "arrow":
            if (!Geometry.rectsIntersecting(nodeRect, selectionWindow)) {
                return false;
            }

            return lineInRect(node as ArrowNode, selectionWindow);
        default:
            throw new Error(`Unknown node type: ${node.type satisfies never}`);
    }
}
