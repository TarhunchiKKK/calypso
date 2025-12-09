import React, { CSSProperties, ReactNode } from "react";
import { NodeBase, NodeHandlers, NodeImpl } from "../types";
import { OmitFields } from "@/shared/lib/typescript";
import clsx from "clsx";

export type StickerNode = NodeBase & {
    x: number;

    y: number;

    width: number;

    height: number;

    text: string;
};

export class Sticker extends NodeImpl {
    public constructor(
        protected node: OmitFields<StickerNode, "type">,
        protected handlers: NodeHandlers = {}
    ) {
        super(node, handlers);
    }

    public toSelected() {
        const sticker = new Sticker(this.node, this.handlers);
        sticker.isSelected = true;
        return sticker;
    }

    public rect() {
        return {
            x: this.node.x,
            y: this.node.y,
            width: this.node.width,
            height: this.node.height
        };
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
                {...this.handlers}
                className={clsx(
                    "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md flex flex-col justify-center items-center",
                    this.isSelected && "outline outline-2 outline-blue-500 "
                )}
                style={styles}
            >
                {this.node.text}
            </div>
        );
    }
}
