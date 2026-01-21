import type React from "react";
import { useEffect, useMemo } from "react";
import { MouseEventsMediator } from "@/shared/lib/react";

const mouseEventsOptions = {
    mouseDownDelay: 700,
    clickDelay: 500
};

// DOCS
export function useMouseEventsMediator() {
    const mediator = useMemo(() => {
        return new MouseEventsMediator<React.MouseEvent>(mouseEventsOptions);
    }, []);

    useEffect(() => {
        return () => {
            mediator.reset();
        };
    }, [mediator]);

    return mediator;
}
