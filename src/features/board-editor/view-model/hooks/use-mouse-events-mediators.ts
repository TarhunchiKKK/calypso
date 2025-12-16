import { MouseEventsMediator } from "@/shared/lib/react";
import React, { useEffect, useMemo } from "react";

const nodeMouseEventOptions = {
    mouseDownDelay: 700,
    clickDelay: 500
};

const overlayMouseEventsOptions = {
    mouseDownDelay: 7000,
    clickDelay: 500
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
