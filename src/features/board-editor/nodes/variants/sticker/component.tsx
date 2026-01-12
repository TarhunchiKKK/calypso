import { CSSProperties, PropsWithChildren } from "react";
import { StickerNode } from "./type";
import { TextareaAutoSize } from "@/shared/ui";
import { NodeHandlers } from "@/features/board-editor/core";

type Props = PropsWithChildren<{
    node: StickerNode;

    isEditing: boolean;

    handlers: NodeHandlers;
}>;

export function StickerComponent({ node, isEditing, handlers, children }: Props) {
    const styles: CSSProperties = {
        width: node.width,
        height: node.height,
        left: node.x,
        top: node.y
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
            className="absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md flex flex-col justify-center items-center cursor-pointer"
            style={styles}
        >
            <TextareaAutoSize isActive={isEditing} value={node.text} onEditingEnd={handleEditingEnd} />

            {children}
        </div>
    );
}
