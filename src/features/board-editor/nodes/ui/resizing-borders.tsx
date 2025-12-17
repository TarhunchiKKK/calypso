import { ResizeDirection } from "../../domain/dom";

/**
 * A UI component that renders the interactive borders around a node, allowing it to be resized.
 * It displays different sets of resize handles based on the props provided.
 *
 * @param {boolean} [main] - If true, displays the top and bottom resize handles.
 * @param {boolean} [cross] - If true, displays the left and right resize handles.
 * @param {boolean} [diagonal] - If true, displays the corner resize handles.
 * @param {(direction: ResizeDirection, e: React.MouseEvent) => void} handleResizeStart - A callback function
 *   that is invoked when a resize operation is initiated. It receives the direction of the resize
 *   and the original mouse event.
 */

type Props = {
    main?: boolean;

    cross?: boolean;

    diagonal?: boolean;

    handleResizeStart: (direction: ResizeDirection, e: React.MouseEvent) => void;
};

export function ResizeBorders({ main, cross, diagonal, handleResizeStart }: Props) {
    return (
        <>
            {main && (
                <>
                    <div
                        className="absolute -top-2 w-full h-4 cursor-n-resize"
                        onMouseDown={e => handleResizeStart("n", e)}
                    ></div>
                    <div
                        className="absolute -bottom-2 w-full h-4 cursor-n-resize"
                        onMouseDown={e => handleResizeStart("s", e)}
                    ></div>
                </>
            )}

            {cross && (
                <>
                    <div
                        className="absolute -left-2 w-4 h-full cursor-w-resize"
                        onMouseDown={e => handleResizeStart("w", e)}
                    ></div>

                    <div
                        className="absolute -right-2  w-4 h-full cursor-w-resize z-20"
                        onMouseDown={e => handleResizeStart("e", e)}
                    ></div>
                </>
            )}

            {diagonal && (
                <>
                    <div
                        className="absolute -left-1 -top-1 w-2 h-2 rounded-full cursor-nw-resize  bg-blue-700"
                        onMouseDown={e => handleResizeStart("nw", e)}
                    ></div>
                    <div
                        className="absolute -right-1 -top-1 w-2 h-2 rounded-full cursor-ne-resize  bg-blue-700"
                        onMouseDown={e => handleResizeStart("ne", e)}
                    ></div>
                    <div
                        className="absolute -right-1 -bottom-1 w-2 h-2 rounded-full cursor-se-resize  bg-blue-700"
                        onMouseDown={e => handleResizeStart("se", e)}
                    ></div>
                    <div
                        className="absolute -left-1 -bottom-1 w-2 h-2 rounded-full cursor-sw-resize  bg-blue-700"
                        onMouseDown={e => handleResizeStart("sw", e)}
                    ></div>
                </>
            )}
        </>
    );
}
