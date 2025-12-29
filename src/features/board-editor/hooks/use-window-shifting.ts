import { useState } from "react";

type WindowShift = {
    x: number;
    y: number;
};

const defaultWindowShift: WindowShift = {
    x: 0,
    y: 0
};

export function useWindowShifting() {
    const [windowShift, setWindowShift] = useState<WindowShift>(defaultWindowShift);

    return { windowShift, setWindowShift };
}

export type WindowShiftingModel = ReturnType<typeof useWindowShifting>;
