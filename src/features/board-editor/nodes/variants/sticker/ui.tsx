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
                    <div className="absolute -inset-y-1 w-full h-1 cursor-n-resize"></div>
                    <div className="absolute inset-y-full w-full h-1 cursor-n-resize"></div>
                    <div className="absolute -inset-x-1 w-1 h-full cursor-w-resize"></div>
                    <div className="absolute inset-x-full w-1 h-full cursor-w-resize"></div>
                </>
            )}
            {node.text}
        </div>
    );
}
