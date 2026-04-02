import type { ResizeDirection } from "@/board-editor/modules/resizing";
import type React from "react";

type Props = {
    main?: boolean;

    cross?: boolean;

    diagonal?: boolean;

    onResizeStart: (direction: ResizeDirection, e: React.MouseEvent) => void;
};

export function ResizeBorders({ main, cross, diagonal, onResizeStart }: Props) {
    return (
        <>
            {main && (
                <>
                    <div
                        className="absolute -top-2 w-full h-4 cursor-n-resize"
                        onMouseDown={e => onResizeStart("n", e)}
                    />

                    <div
                        className="absolute -bottom-2 w-full h-4 cursor-n-resize"
                        onMouseDown={e => onResizeStart("s", e)}
                    />
                </>
            )}

            {cross && (
                <>
                    <div
                        className="absolute -left-2 w-4 h-full cursor-w-resize"
                        onMouseDown={e => onResizeStart("w", e)}
                    />

                    <div
                        className="absolute -right-2  w-4 h-full cursor-w-resize z-20"
                        onMouseDown={e => onResizeStart("e", e)}
                    />
                </>
            )}

            {diagonal && (
                <>
                    <div
                        className="absolute -left-1 -top-1 w-2 h-2 rounded-full cursor-nw-resize bg-blue-700"
                        onMouseDown={e => onResizeStart("nw", e)}
                    />

                    <div
                        className="absolute -right-1 -top-1 w-2 h-2 rounded-full cursor-ne-resize bg-blue-700"
                        onMouseDown={e => onResizeStart("ne", e)}
                    />

                    <div
                        className="absolute -right-1 -bottom-1 w-2 h-2 rounded-full cursor-se-resize bg-blue-700"
                        onMouseDown={e => onResizeStart("se", e)}
                    />

                    <div
                        className="absolute -left-1 -bottom-1 w-2 h-2 rounded-full cursor-sw-resize bg-blue-700"
                        onMouseDown={e => onResizeStart("sw", e)}
                    />
                </>
            )}
        </>
    );
}
