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
                </>
            )}
            {node.text}
        </div>
    );
}
