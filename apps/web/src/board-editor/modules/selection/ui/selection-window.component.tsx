import type { Rect } from "@lib/common";

type Props = {
    rect: Rect;
};

export function SelectionWindow({ rect }: Props) {
    return (
        <div
            className="absolute inset-0 bg-selection/30 border-2 border-selection"
            style={{
                transform: `translate(${rect.x}px, ${rect.y}px)`,
                width: rect.width,
                height: rect.height
            }}
        />
    );
}
