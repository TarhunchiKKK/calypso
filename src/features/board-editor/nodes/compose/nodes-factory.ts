import { Sticker, StickerNode } from "../variants/sticker";
import { AnyNode } from "./types";

export class NodesFactory {
    public static create(node: AnyNode) {
        switch (node.type) {
            case "sticker":
                return new Sticker(node);
            default:
                throw Error("Unknown node type");
        }
    }

    public static sticker(data: Pick<StickerNode, "x" | "y">) {
        return new Sticker({
            ...data,
            id: crypto.randomUUID(),
            width: 100,
            height: 100,
            text: "Hello"
        });
    }
}
