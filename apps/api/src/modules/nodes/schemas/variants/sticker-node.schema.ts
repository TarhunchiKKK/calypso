import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { NodeTypes, StickerNode as TypeStickerNode } from "@repo/common";
import { Rect } from "../core/geometry.schemas";
import { NodeBase } from "../core/node-base.schema";

export const STICKER_NODE_DISCRIMINATOR_VALUE: NodeTypes = "sticker";

@Schema()
export class StickerNode extends NodeBase implements TypeStickerNode {
    @Prop({ type: String, required: true, default: STICKER_NODE_DISCRIMINATOR_VALUE })
    public type: "sticker";

    @Prop({ type: Rect, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public text: string;
}

export const StickerNodeSchema = SchemaFactory.createForClass(StickerNode);
