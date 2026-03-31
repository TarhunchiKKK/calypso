import type { BindingPointPositions } from "./binding-points.type";

type Props = {
    positions: {
        [Position in BindingPointPositions]?: boolean;
    };
};

const commonClasses =
    "absolute w-[10px] h-[10px] rounded-full bg-blue-500 hover:w-[14px] hover:h-[14px] hover:blur-[2px]";

const positioningClassesMap: Record<BindingPointPositions, string> = {
    n: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    nw: "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "nw-mid": "top-0 left-1/4 -translate-x-1/2 -translate-y-1/2",
    ne: "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "ne-mid": "top-0 left-3/4 -translate-x-1/2 -translate-y-1/2",
    s: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    sw: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    "sw-mid": "-bottom-1 left-1/4 -translate-x-1/2",
    se: "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
    "se-mid": "bottom-0 left-3/4 -translate-x-1/2 translate-y-1/2",
    w: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
    "wn-mid": "top-1/4 left-0 -translate-x-1/2 -translate-y-1/2",
    "ws-mid": "top-3/4 left-0 -translate-x-1/2 -translate-y-1/2",
    e: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
    "en-mid": "top-1/4 right-0 translate-x-1/2 -translate-y-1/2",
    "es-mid": "top-3/4 right-0 translate-x-1/2 -translate-y-1/2"
};

export function BindingPoints({ positions }: Props) {
    return (
        <>
            {(Object.keys(positions) as BindingPointPositions[]).map(position => (
                <div key={position} className={`${commonClasses} ${positioningClassesMap[position]}`} />
            ))}
        </>
    );
}
