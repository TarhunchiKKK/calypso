import { Sticker } from "../variants/sticker";
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
}
