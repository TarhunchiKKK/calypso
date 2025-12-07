import { CSSProperties, ReactNode } from "react";
import { NodeBase, NodeImpl } from "../types";
import { OmitFields } from "@/shared/lib/typescript";

export type StickerNode = NodeBase & {
    x: number;

    y: number;

    width: number;

    height: number;

    text: string;
};

export class Sticker extends NodeImpl {
    public constructor(protected node: OmitFields<StickerNode, "type">) {
        super(node);
    }

    public render(): ReactNode {
        const styles: CSSProperties = {
            width: this.node.width,
            height: this.node.height,
            left: this.node.x,
            top: this.node.y
        };

        return (
            <div
                key={this.node.id}
                className="absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md flex flex-col justify-center items-center"
                style={styles}
            >
                {this.node.text}
            </div>
        );
    }
}
