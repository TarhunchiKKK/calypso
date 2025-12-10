import clsx from "clsx";
import { CSSProperties, useEffect, useState } from "react";
import { NodeHandlers } from "../base";
import { StickerNode } from "./type";
import { Geometry, Point, Rect } from "@/features/board-editor/domain/geometry";
import { ResizeDirection } from "@/features/board-editor/domain/dom";
import { Sticker } from "./entity";

type Props = {
    node: StickerNode;
    isSelected: boolean;
    resizable: boolean;
    handlers: NodeHandlers;
};

export function StickerComponent({ node, isSelected, resizable, handlers }: Props) {
    const [sizes, setSizes] = useState<Rect>({
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height
    });
    const [resizeDirection, setResizeDirection] = useState<ResizeDirection>();

    const styles: CSSProperties = {
        width: sizes.width,
        height: sizes.height,
        left: sizes.x,
        top: sizes.y
    };

    const onResizeStart = (direction: ResizeDirection) => {
        setResizeDirection(direction);
        handlers.onResizeStart?.();
    };

    useEffect(() => {
        if (!resizeDirection) {
            return;
        }

        console.log("fire");

        const onResizePending = (e: MouseEvent) => {
            if (!resizeDirection) {
                return;
            }

            const currentPoint: Point = { x: e.clientX, y: e.clientY };

            setSizes(prev => Geometry.applyResizing(prev, currentPoint, resizeDirection));
        };

        const onResizeEnd = () => {
            setResizeDirection(undefined);
            handlers.onResizeEnd?.(
                new Sticker({
                    ...node,
                    ...sizes
                })
            );
        };

        window.addEventListener("mousemove", onResizePending);
        window.addEventListener("mouseup", onResizeEnd);

        return () => {
            window.removeEventListener("mousemove", onResizePending);
            window.removeEventListener("mouseup", onResizeEnd);
        };
    }, [handlers, node, resizeDirection, sizes]);

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
                        onMouseDown={() => onResizeStart("w")}
                    ></div>
                    <div
                        className="absolute inset-x-full w-3 h-full cursor-w-resize"
                        onMouseDown={() => onResizeStart("e")}
                    ></div>
                    <div
                        className="absolute -inset-y-1 w-full h-3 cursor-n-resize"
                        onMouseDown={() => onResizeStart("n")}
                    ></div>
                    <div
                        className="absolute inset-y-full w-full h-3 cursor-n-resize"
                        onMouseDown={() => onResizeStart("s")}
                    ></div>
                </>
            )}
            {node.text}
        </div>
    );
}
