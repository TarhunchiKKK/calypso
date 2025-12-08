import { RefCallback, useCallback, useState } from "react";
import { Rect } from "../../domain/geometry";

export function useCanvasRect() {
    const [canvasRect, setCanvasRect] = useState<Rect>();

    const canvasRef: RefCallback<HTMLDivElement> = useCallback(el => {
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { x, y, width, height } = entry.target.getBoundingClientRect();

                setCanvasRect({ x, y, width, height });
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

    return { canvasRect, canvasRef };
}
