import type { Point } from "@repo/common";
import { useState } from "react";
import { Geometry } from "@/shared/lib/geometry";

export function preventDefaultHandler(e: Pick<Event, "preventDefault">) {
    e.preventDefault();
}

export function stopPropagationHandler(e: Pick<Event, "stopPropagation">) {
    e.stopPropagation();
}

export function useLastClick() {
    const [point, setPoint] = useState<Point>();

    const handle = (e: React.MouseEvent) => {
        setPoint(Geometry.pointFromEvent(e));
    };

    return {
        point,
        handle
    };
}
