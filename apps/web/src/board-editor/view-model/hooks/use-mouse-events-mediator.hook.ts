import { useEffect, useMemo } from "react";
import { MouseEventsMediator, MouseEventsSeparator } from "@/shared/lib/react";

const mouseEventsOptions = {
    mouseDownDelay: 600,
    clickDelay: 400,
    doubleClickDelay: 700
};

export function useMouseEventsMediator() {
    const mediator = useMemo(() => {
        return new MouseEventsSeparator(new MouseEventsMediator(mouseEventsOptions), new MouseEventsMediator(mouseEventsOptions));
    }, []);

    useEffect(() => {
        return () => {
            mediator.reset();
        };
    }, [mediator]);

    return mediator;
}
