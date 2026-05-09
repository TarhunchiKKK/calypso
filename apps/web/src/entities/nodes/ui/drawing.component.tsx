import type { DrawingNode } from "@repo/boards-common";
import { getStroke, type StrokeOptions, type Vec2 } from "perfect-freehand";
import { type SVGProps, useMemo } from "react";
import { Geometry } from "@/shared/lib/geometry";

type Props = {
    node: DrawingNode;

    svgProps?: SVGProps<SVGSVGElement>;

    pathProps?: SVGProps<SVGPathElement>;
};

const defaultOptions: StrokeOptions = {
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

function getSvgPathFromStroke(stroke: Vec2[]) {
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

export function Drawing({ node }: Props) {
    const pathData = useMemo(() => {
        const mappedPoints = node.points.map(Geometry.pointToTuple);

        const stroke = getStroke(mappedPoints, {
            ...defaultOptions,
            size: node.styles.lineWidth
        });

        return getSvgPathFromStroke(stroke);
    }, [node.points, node.styles.lineWidth]);

    return (
        <svg className="pointer-events-none" style={{ touchAction: "none" }}>
            {<path d={pathData} stroke={node.styles.lineColor} fill={node.styles.lineColor} />}
        </svg>
    );
}
