import { CSSProperties } from "react";
import { StickerNode } from "./types";

type Props = {
    sticker: StickerNode;
};

export function Sticker({ sticker }: Props) {
    const styles: CSSProperties = {
        width: sticker.width,
        height: sticker.height,
        left: sticker.x,
        top: sticker.y
    };

    return (
        <div
            className="absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md flex flex-col justify-center items-center"
            style={styles}
        >
            {sticker.text}
        </div>
    );
}
