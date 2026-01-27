import { useEffect, useMemo } from "react";
import { MouseEventsMediator, MouseEventsSeparator } from "@/shared/lib/react";

const mouseEventsOptions = {
    mouseDownDelay: 700,
    clickDelay: 500
};

// DOCS
export function useMouseEventsMediator() {
    const mediator = useMemo(() => {
        return new MouseEventsSeparator(new MouseEventsMediator(mouseEventsOptions), new MouseEventsMediator(mouseEventsOptions));
    }, []);

    useEffect(() => {
        return () => {
            mediator.left.reset();
            mediator.right.reset();
        };
    }, [mediator]);

    return mediator;
}
