import { MouseEventsMediator } from "@/shared/lib/react";
import type React from "react";
import { useEffect, useMemo } from "react";

const nodeMouseEventOptions = {
    mouseDownDelay: 700,
    clickDelay: 500
};

const overlayMouseEventsOptions = {
    mouseDownDelay: 700,
    clickDelay: 500
};

/**
 * A custom hook that provides memoized instances of MouseEventsMediator for nodes and the overlay.
 * This hook is responsible for creating, managing, and cleaning up the mediators,
 * ensuring that they are persistent across re-renders and properly reset when the component unmounts.
 *
 * @returns An object containing two MouseEventsMediator instances:
 * - `node`: For handling mouse events on individual nodes.
 * - `overlay`: For handling mouse events on the main canvas overlay.
 */
export function useMouseEventsMediators() {
    const nodeMediator = useMemo(() => new MouseEventsMediator<React.MouseEvent>(nodeMouseEventOptions), []);

    const overlayMediator = useMemo(() => new MouseEventsMediator<React.MouseEvent>(overlayMouseEventsOptions), []);

    useEffect(() => {
        return () => {
            nodeMediator.reset();
            overlayMediator.reset();
        };
    }, [nodeMediator, overlayMediator]);

    return { node: nodeMediator, overlay: overlayMediator };
}
