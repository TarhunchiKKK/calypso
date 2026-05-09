import type { DrawingNode } from "@repo/boards-common";
import { getStroke, type Vec2 } from "perfect-freehand";
import type { CSSProperties, PropsWithChildren } from "react";
import { useMemo } from "react";
import type { NodeHandlers, NodeUiSettings } from "@/board-editor/core";
import { Geometry } from "@/shared/lib/geometry";

type Props = PropsWithChildren<{
    node: DrawingNode;

    handlers: NodeHandlers;

    uiSettings: NodeUiSettings;
}>;

const options = {
    size: 32,
    thinning: 0.5,
    smoothing: 0.9,
    streamline: 0.3,
    easing: t => t,
    start: {
        taper: 0,
        easing: t => t,
        cap: true
    },
    end: {
        taper: 100,
        easing: t => t,
        cap: true
    }
};

export function getSvgPathFromStroke(stroke: Vec2[]) {
    if (!stroke.length) return "";

    const d = stroke.reduce(
        (acc, [x0, y0], i, arr) => {
            const [x1, y1] = arr[(i + 1) % arr.length];
            acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
            return acc;
        },
        ["M", ...stroke[0], "Q"]
    );

    d.push("Z");
    return d.join(" ");
}

export function DrawingNodeComponent({ node, handlers, uiSettings, children }: Props) {
    const wrapperStyles: CSSProperties = {
        width: node.rect.width,
        height: node.rect.height,
        left: node.rect.x,
        top: node.rect.y
    };

    const mappedPoints = useMemo(() => {
        return node.points.map(Geometry.pointToTuple);
    }, [node.points]);

    console.log(mappedPoints);

    const stroke = getStroke(mappedPoints, options);
    const pathData = getSvgPathFromStroke(stroke);

    return (
        <div data-id={node.id} className="absolute" style={wrapperStyles}>
            <div className="relative w-full h-full">
                {uiSettings.showContent && (
                    <svg className="pointer-events-none" style={{ touchAction: "none" }}>
                        {<path d={pathData} stroke={node.styles.lineColor} fill={node.styles.lineColor} />}
                    </svg>
                )}

                {children}
            </div>
        </div>
    );
}
