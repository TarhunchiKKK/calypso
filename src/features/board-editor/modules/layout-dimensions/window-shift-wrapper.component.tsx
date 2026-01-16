import type { PropsWithChildren } from "react";
import type { Offset } from "@/features/board-editor/core";

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
