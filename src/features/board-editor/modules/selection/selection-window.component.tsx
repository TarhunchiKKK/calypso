import type { Rect } from "@/features/board-editor/core";

type Props = Rect;

export function SelectionWindow({ height, width, x, y }: Props) {
    return (
        <div
            className="absolute inset-0 bg-blue-500/30 border-2 border-blue-500"
            style={{
                transform: `translate(${x}px, ${y}px)`,
                width: width,
                height: height
            }}
        ></div>
    );
}
