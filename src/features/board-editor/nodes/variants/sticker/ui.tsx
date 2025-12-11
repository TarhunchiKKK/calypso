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
                        className="absolute -inset-x-2 w-4 h-full cursor-w-resize"
                        onMouseDown={e => handleResizeStart("w", e)}
                    ></div>
                    <div
                        className="absolute inset-x-full w-3 h-full cursor-w-resize z-20"
                        onMouseDown={e => handleResizeStart("e", e)}
                    ></div>
                    <div
                        className="absolute -inset-y-1 w-full h-3 cursor-n-resize"
                        onMouseDown={e => handleResizeStart("n", e)}
                    ></div>
                    <div
                        className="absolute inset-y-full w-full h-3 cursor-n-resize"
                        onMouseDown={e => handleResizeStart("s", e)}
                    ></div>
                </>
            )}
            {node.text}
        </div>
    );
}
