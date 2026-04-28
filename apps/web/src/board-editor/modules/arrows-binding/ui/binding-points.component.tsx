import type { Point } from "@repo/common";

type Props = {
    referencePoints: Point[];

    onMouseUp: (point: Point) => void;
};

const className = "absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-binding hover:w-3.5 hover:h-3.5 hover:blur-[2px]";

export function BindingPoints({ referencePoints, onMouseUp }: Props) {
    return (
        <>
            {referencePoints.map((point, index) => (
                <div key={index} className={className} style={{ left: point.x, top: point.y }} onMouseUp={onMouseUp.bind(null, point)} />
            ))}
        </>
    );
}
