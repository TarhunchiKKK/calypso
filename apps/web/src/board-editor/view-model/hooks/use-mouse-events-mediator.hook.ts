import { useEffect, useMemo } from "react";
import { MouseEventsMediator, MouseEventsSeparator } from "@/shared/lib/react";

// const mouseEventsOptions = {
//     mouseDownDelay: 150,
//     clickDelay: 200,
//     doubleClickDelay: 300
// };

const mouseEventsOptions = {
    mouseDownDelay: 350,
    clickDelay: 400,
    doubleClickDelay: 500
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
