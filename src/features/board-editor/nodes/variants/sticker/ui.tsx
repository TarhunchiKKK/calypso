import clsx from "clsx";
import { CSSProperties } from "react";
import { NodeHandlers } from "../base";
import { StickerNode } from "./type";
import { ResizeDirection } from "@/features/board-editor/domain/dom";
import { ResizeBorders } from "@/features/board-editor/nodes/ui/resizing-borders";
import { TextareaAutoSize } from "../../ui/textarea-auto-size";
import { Sticker } from "./entity";

type Props = {
    node: StickerNode;
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

    const handleResizeStart = (direction: ResizeDirection, e: React.MouseEvent) => {
        e.stopPropagation();
        handlers.onResizeStart?.(node.id, direction);
    };

    const handleEditingEnd = (newText: string) => {
        const newNode = { ...node, text: newText };
        handlers.onEditingEnd?.(new Sticker(newNode));
    };

    return (
        <div
            onClick={handlers.onClick}
            onMouseDown={handlers.onMouseDown}
            onDoubleClick={handlers.onDoubleClick}
            className={clsx(
                "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md flex flex-col justify-center items-center cursor-pointer",
                isSelected && "outline-2 outline-blue-500"
            )}
            style={styles}
        >
            {resizable && <ResizeBorders main cross diagonal handleResizeStart={handleResizeStart} />}

            <TextareaAutoSize isActive={isEditing} initialValue={node.text} onEditingEnd={handleEditingEnd} />
        </div>
    );
}
