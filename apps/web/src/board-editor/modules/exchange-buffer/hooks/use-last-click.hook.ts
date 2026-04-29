import type { Point } from "@repo/common";
import { useEffect, useRef } from "react";
import { Geometry } from "@/shared/lib/geometry";

export function useLastClick() {
    const ref = useRef<Point>(undefined);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            ref.current = Geometry.pointFromEvent(e);
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return ref.current;
}
