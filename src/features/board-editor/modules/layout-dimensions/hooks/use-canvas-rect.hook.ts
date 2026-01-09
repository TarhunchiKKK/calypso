import { RefCallback, useCallback, useState } from "react";
import { Rect } from "../../../lib/geometry";

export function useCanvasRect() {
    const [rect, setRect] = useState<Rect>();

    const ref: RefCallback<HTMLDivElement> = useCallback(el => {
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { x, y, width, height } = entry.target.getBoundingClientRect();

                setRect({ x, y, width, height });
            }
        });

        if (el) {
            observer.observe(el);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);

    return { rect, ref };
}
