import type { Point } from "@repo/common";
import type { DOMAttributes } from "react";

type Props = {
    referencePoints: Point[];

    handlers: Pick<
        DOMAttributes<HTMLDivElement>,
        "onMouseEnter" | "onMouseLeave" | "onMouseUp"
    >;
};

const className =
    "absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-binding hover:w-3.5 hover:h-3.5 hover:blur-[2px]";

export function BindingPoints({ referencePoints, handlers }: Props) {
    return (
        <>
            {referencePoints.map((point, index) => (
                <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: in this component this cannot give an error
                    key={index}
                    className={className}
                    style={{ left: point.x, top: point.y }}
                    {...handlers}
                />
            ))}
        </>
    );
}
