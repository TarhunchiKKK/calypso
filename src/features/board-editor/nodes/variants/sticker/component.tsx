import clsx from "clsx";
import { CSSProperties } from "react";
import { NodeHandlers } from "../base";
import { StickerNode } from "./type";
import { ResizeDirection, ResizeBorders } from "@/features/board-editor/modules/resizing";
import { TextareaAutoSize } from "@/shared/ui";

type Props = {
    node: StickerNode;

    // REFACTOR: this props should be in apropriate decorator/proxy
    isSelected: boolean;
    resizable: boolean;

    isEditing: boolean;

    handlers: NodeHandlers;
};

export function StickerComponent({ node, isSelected, resizable, isEditing, handlers }: Props) {
    const styles: CSSProperties = {
        width: node.width,
        height: node.height,
        left: node.x,
        top: node.y
    };

    // REFACTOR: this handler should be in decorator/proxy
    const handleResizeStart = (direction: ResizeDirection, e: React.MouseEvent) => {
        e.stopPropagation();
        handlers.onResizeStart?.(node.id, direction);
    };

    const handleEditingEnd = (newText: string) => {
        const newNode = { ...node, text: newText };
        handlers.onEditingEnd?.(newNode);
    };

    return (
        <div
            data-id={node.id}
            onClick={handlers.onClick}
            onMouseDown={handlers.onMouseDown}
            onMouseUp={handlers.onMouseUp}
            onDoubleClick={handlers.onDoubleClick}
            className={clsx(
                "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md flex flex-col justify-center items-center cursor-pointer",
                isSelected && "outline-2 outline-blue-500"
            )}
            style={styles}
        >
            {/* REFACTOR: this UI should be in wrapper */}
            {resizable && <ResizeBorders main cross diagonal handleResizeStart={handleResizeStart} />}

            <TextareaAutoSize isActive={isEditing} value={node.text} onEditingEnd={handleEditingEnd} />
        </div>
    );
}
