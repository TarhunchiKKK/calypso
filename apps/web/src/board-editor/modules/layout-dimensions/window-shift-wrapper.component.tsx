import type { Offset } from "@repo/common";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    offset: Offset;

    zoom: number;
}>;

export function LayoutDimensionsWrapper({ offset, zoom, children }: Props) {
    return (
        <div
            data-testid="layout-dimensions-wrapper"
            style={{
                transformOrigin: "left top",
                transform: `scale(${zoom}) translate(${-offset.dx}px, ${-offset.dy}px)`
            }}
        >
            {children}
        </div>
    );
}
