import type React from "react";
import type { ResizeDirection } from "@/board-editor/modules/resizing";

type Props = {
    rect?: boolean;

    diagonal?: boolean;

    onResizeStart: (direction: ResizeDirection, e: React.MouseEvent) => void;
};

export function ResizeBorders({ rect, diagonal, onResizeStart }: Props) {
    return (
        <>
            {rect && (
                <>
                    <div className="absolute -top-2 left-0 w-full h-4 cursor-n-resize" onMouseDown={(e) => onResizeStart("n", e)} />

                    <div className="absolute -bottom-2 left-0  w-full h-4 cursor-n-resize" onMouseDown={(e) => onResizeStart("s", e)} />

                    <div className="absolute top-0 -left-2 w-4 h-full cursor-w-resize" onMouseDown={(e) => onResizeStart("w", e)} />

                    <div className="absolute top-0 -right-2 w-4 h-full cursor-w-resize" onMouseDown={(e) => onResizeStart("e", e)} />
                </>
            )}

            {diagonal && (
                <>
                    <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full cursor-nw-resize bg-resizing" onMouseDown={(e) => onResizeStart("nw", e)} />

                    <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full cursor-ne-resize bg-resizing" onMouseDown={(e) => onResizeStart("ne", e)} />

                    <div
                        className="absolute -right-1 -bottom-1 w-2 h-2 rounded-full cursor-se-resize bg-resizing"
                        onMouseDown={(e) => onResizeStart("se", e)}
                    />

                    <div className="absolute -left-1 -bottom-1 w-2 h-2 rounded-full cursor-sw-resize bg-resizing" onMouseDown={(e) => onResizeStart("sw", e)} />
                </>
            )}
        </>
    );
}
