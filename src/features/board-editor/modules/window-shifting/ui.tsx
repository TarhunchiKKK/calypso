import { PropsWithChildren } from "react";
import { WindowShift } from "./types";

type Props = PropsWithChildren<{
    shift: WindowShift;
}>;

export function WindowShiftWrapper({ shift, children }: Props) {
    return (
        <div style={{ transformOrigin: "left top", transform: `translate(${shift.x}px, ${shift.y}px)` }}>
            {children}
        </div>
    );
}
