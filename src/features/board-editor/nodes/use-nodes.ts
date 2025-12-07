import { useState } from "react";
import { StickerNode } from "./sticker/types";

export function useNodes() {
    const [nodes] = useState<StickerNode[]>([
        {
            id: crypto.randomUUID(),
            type: "sticker",
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            text: "Hello 1"
        },
        {
            id: crypto.randomUUID(),
            type: "sticker",
            x: 200,
            y: 200,
            width: 150,
            height: 150,
            text: "Hello 2"
        }
    ]);

    return { nodes };
}
