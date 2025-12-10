import clsx from "clsx";
import { CSSProperties } from "react";
import { NodeHandlers } from "../base";
import { StickerNode } from "./type";

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
                        className="absolute -inset-x-1 w-3 h-full cursor-w-resize"
                        onMouseDown={() => handlers.onResizeStart?.(node.id, "w")}
                    ></div>
                    <div
                        className="absolute inset-x-full w-3 h-full cursor-w-resize"
                        onMouseDown={() => handlers.onResizeStart?.(node.id, "e")}
                    ></div>
                    <div
                        className="absolute -inset-y-1 w-full h-3 cursor-n-resize"
                        onMouseDown={() => handlers.onResizeStart?.(node.id, "n")}
                    ></div>
                    <div
                        className="absolute inset-y-full w-full h-3 cursor-n-resize"
                        onMouseDown={() => handlers.onResizeStart?.(node.id, "s")}
                    ></div>
                </>
            )}
            {node.text}
        </div>
    );
}
