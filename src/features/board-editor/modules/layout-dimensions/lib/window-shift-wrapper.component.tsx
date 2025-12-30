import { Offset } from "@/features/board-editor/lib/geometry";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    offset: Offset;
}>;

export function LayoutDimensionsWrapper({ offset, children }: Props) {
    return (
        <div style={{ transformOrigin: "left top", transform: `translate(${offset.dx}px, ${offset.dy}px)` }}>
            {children}
        </div>
    );
}
