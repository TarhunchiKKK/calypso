import { Sticker } from "../variants/sticker/entity";
import { StickerNode } from "../variants/sticker/type";
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
            type: "sticker",
            width: 100,
            height: 100,
            text: "Hello"
        });
    }
}
