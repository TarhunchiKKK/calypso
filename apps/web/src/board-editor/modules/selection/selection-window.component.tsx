import type { Rect } from "@repo/common";

type Props = {
    rect: Rect;
};

export function SelectionWindow({ rect }: Props) {
    return (
        <div
            className="absolute inset-0 bg-blue-500/30 border-2 border-blue-500"
            style={{
                transform: `translate(${rect.x}px, ${rect.y}px)`,
                width: rect.width,
                height: rect.height
            }}
        />
    );
}
