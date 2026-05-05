import { useEffect, useLayoutEffect, useRef } from "react";

type WindowEvents = {
    onMouseMove?: (e: MouseEvent) => void;
    onMouseUp?: (e: MouseEvent) => void;
    onWheel?: (e: WheelEvent) => void;
};

/**
 * A custom hook that attaches global mouse event listeners (`mousemove` and `mouseup`) to the `window` object.
 * It's designed to handle events that need to be captured regardless of where the mouse is on the page,
 * such as during a drag operation that might go outside the component's bounds.
 *
 * @param events An object containing the event handlers to be attached.
 *   These handlers are stored in a `ref` to ensure that the latest versions are always used
 *   without needing to re-attach the event listeners on every render.
 */
export function useWindowEvents(events: WindowEvents) {
    const eventsRef = useRef(events);

    useLayoutEffect(() => {
        eventsRef.current = events;
    }, [events]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: Else this will not work like expected
    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            eventsRef.current?.onMouseMove?.(e);
        };

        const onMouseUp = (e: MouseEvent) => {
            eventsRef.current?.onMouseUp?.(e);
        };

        const onWheel = (e: WheelEvent) => {
            eventsRef.current?.onWheel?.(e);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("wheel", onWheel);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("wheel", onWheel);
        };
    }, [eventsRef]);
}
