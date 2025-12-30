import React, { useState } from "react";
import { Geometry, Offset, Point } from "@/features/board-editor/lib/geometry";

const defaultWindowShift: Offset = {
    dx: 0,
    dy: 0
};

/**
 * `useWindowShift` is a custom hook that provides functionality for panning or shifting a window.
 * It tracks the window's offset based on user mouse movements, specifically when dragging with the right mouse button.
 *
 * @returns {WindowShiftModel} An object containing the window shift state and event handlers.
 *
 * @property {WindowShift} windowShift - The current offset of the window, with `x` and `y` properties.
 * @property {React.Dispatch<React.SetStateAction<WindowShift>>} setWindowShift - Function to directly set the window shift state.
 * @property {(e: React.MouseEvent) => boolean} is - A function that returns `true` if the right mouse button is pressed.
 * @property {(e: React.MouseEvent) => void} handleMouseDown - Mouse down event handler. Initiates the window shifting when the right mouse button is pressed.
 * @property {(e: MouseEvent) => void} handleMouseMove - Mouse move event handler. Calculates and applies the window shift based on the drag movement.
 * @property {() => void} handleMouseUp - Mouse up event handler. Finalizes the window shifting action.
 */
export function useWindowShift() {
    const [windowShift, setWindowShift] = useState(defaultWindowShift);
    const [startPoint, setStartPoint] = useState<Point>();

    const is = (e: React.MouseEvent) => {
        return e.button === 2;
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (is(e)) {
            setStartPoint({
                x: e.clientX,
                y: e.clientY
            });
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!startPoint) {
            return;
        }

        const currentPoint = {
            x: e.clientX,
            y: e.clientY
        };

        const offset = Geometry.calculateOffset(startPoint, currentPoint);

        setWindowShift(offset);
    };

    const handleMouseUp = () => {
        setStartPoint(undefined);
    };

    return { windowShift, setWindowShift, is, handleMouseDown, handleMouseMove, handleMouseUp };
}

export type WindowShiftModel = ReturnType<typeof useWindowShift>;
