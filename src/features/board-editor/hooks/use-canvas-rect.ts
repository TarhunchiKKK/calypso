import { RefCallback, useCallback, useState } from "react";
import { Rect } from "../domain/geometry";

/**
 * A custom hook that tracks the bounding rectangle of a canvas element.
 * It uses a ResizeObserver to automatically update the rectangle's dimensions
 * whenever the canvas element is resized.
 *
 * @returns An object containing:
 * - `canvasRect`: A state variable holding the current `Rect` of the canvas (x, y, width, height).
 *   It is `undefined` until the canvas is rendered.
 * - `canvasRef`: A `RefCallback` that should be attached to the `ref` of the canvas `div` element.
 */
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
