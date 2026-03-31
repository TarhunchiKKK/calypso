import type { Point } from "@repo/common";

type Props = {
    referencePoints: Point[];
};

const className =
    "absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 hover:w-3.5 hover:h-3.5 hover:blur-[2px]";

export function BindingPoints({ referencePoints }: Props) {
    return (
        <>
            {referencePoints.map((point, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: in this component this cannot give an error
                <div key={index} className={className} style={{ left: point.x, top: point.y }} />
            ))}
        </>
    );
}
