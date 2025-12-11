import clsx from "clsx";
import { CSSProperties } from "react";
import { NodeHandlers } from "../base";
import { StickerNode } from "./type";
import { ResizeDirection } from "@/features/board-editor/domain/dom";

type Props = {
    node: StickerNode;
    isSelected: boolean;
    resizable: boolean;
    handlers: NodeHandlers;
};

export function StickerComponent({ node, isSelected, resizable, handlers }: Props) {
    const styles: CSSProperties = {
        width: node.width,
        height: node.height,
        left: node.x,
        top: node.y
    };

    const handleResizeStart = (direction: ResizeDirection, e: React.MouseEvent) => {
        e.stopPropagation();
        handlers.onResizeStart?.(node.id, direction);
    };

    return (
        <div
            onClick={handlers.onClick}
            onMouseDown={handlers.onMouseDown}
            className={clsx(
                "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md flex flex-col justify-center items-center cursor-pointer",
                isSelected && "outline-2 outline-blue-500"
            )}
            style={styles}
        >
            {resizable && (
                <>
                    <div
                        className="absolute -left-2 w-4 h-full cursor-w-resize"
                        onMouseDown={e => handleResizeStart("w", e)}
                    ></div>
                    <div
                        className="absolute -right-2  w-4 h-full cursor-w-resize z-20"
                        onMouseDown={e => handleResizeStart("e", e)}
                    ></div>
                    <div
                        className="absolute -top-2 w-full h-4 cursor-n-resize"
                        onMouseDown={e => handleResizeStart("n", e)}
                    ></div>
                    <div
                        className="absolute -bottom-2 w-full h-4 cursor-n-resize"
                        onMouseDown={e => handleResizeStart("s", e)}
                    ></div>

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
            {node.text}
        </div>
    );
}
