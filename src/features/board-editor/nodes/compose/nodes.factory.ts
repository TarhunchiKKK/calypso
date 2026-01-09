import { StickerNodeWrapper } from "../variants/sticker/wrapper";
import { StickerNode } from "../variants/sticker/type";
import { AnyNode } from "./types";

export class NodesFactory {
    public static wrap(node: AnyNode) {
        switch (node.type) {
            case "sticker":
                return new StickerNodeWrapper(node);
            default:
                throw Error("Unknown node type");
        }
    }

    // REFACTOR: `Point` type should be used as parameter
    public static sticker(data: Pick<StickerNode, "x" | "y">) {
        return new StickerNodeWrapper({
            ...data,

            id: crypto.randomUUID(),

            // REFACTOR: this values should be moved to constant
            type: "sticker",
            width: 100,
            height: 100,
            text: "Hello"
        });
    }
}
