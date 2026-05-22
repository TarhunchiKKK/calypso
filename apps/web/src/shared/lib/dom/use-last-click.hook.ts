import type { Point } from "@repo/common";
import { useState } from "react";
import { Geometry } from "../geometry";

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
