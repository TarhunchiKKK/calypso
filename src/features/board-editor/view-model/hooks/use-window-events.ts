import { useRef, useLayoutEffect, useEffect } from "react";
import { ViewModel } from "../types";

export function useWindowEvents(events: ViewModel["window"]) {
    const eventsRef = useRef(events);

    useLayoutEffect(() => {
        eventsRef.current = events;
    }, [events]);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            eventsRef.current?.onMouseMove?.(e);
        };
        const onMouseUp = (e: MouseEvent) => {
            eventsRef.current?.onMouseUp?.(e);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [eventsRef]);
}
