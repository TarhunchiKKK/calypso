import { MouseEventsMediator } from "@/shared/lib/react";
import React, { useEffect, useMemo } from "react";

const nodeMouseEventOptions = {
    mouseDownDelay: 250,
    clickDelay: 250
};

const overlayMouseEventsOptions = {
    mouseDownDelay: 250,
    clickDelay: 250
};

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

export type MouseEventsMediators = ReturnType<typeof useMouseEventsMediators>;
