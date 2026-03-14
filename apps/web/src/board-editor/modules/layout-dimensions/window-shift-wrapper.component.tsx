import type { Offset } from "@/shared/lib/geometry";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    offset: Offset;

    zoom: number;
}>;

export function LayoutDimensionsWrapper({ offset, zoom, children }: Props) {
    return (
        <div
            style={{
                transformOrigin: "left top",
                transform: `scale(${zoom}) translate(${-offset.dx}px, ${-offset.dy}px)`
            }}
        >
            {children}
        </div>
    );
}
