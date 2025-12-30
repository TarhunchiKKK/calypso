import { Offset } from "@/features/board-editor/lib/geometry";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    shift: Offset;
}>;

export function WindowShiftWrapper({ shift, children }: Props) {
    return (
        <div style={{ transformOrigin: "left top", transform: `translate(${shift.dx}px, ${shift.dy}px)` }}>
            {children}
        </div>
    );
}
