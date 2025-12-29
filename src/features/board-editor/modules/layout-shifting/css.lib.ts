import { WindowShift } from "./types";

export function createWindowShiftCssProperties(shift: WindowShift) {
    return {
        "--x": shift.x + "px",
        "--y": shift.y + "px"
    } as React.CSSProperties;
}
