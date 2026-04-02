import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { StickerNode as StickerNodeType } from "@repo/boards-common";
import type { Rect } from "@repo/common";
import { NodeBase } from "./node-base.schema";

@Schema()
export class StickerNode extends NodeBase implements StickerNodeType {
    @Prop({ type: String, required: true })
    public declare type: "sticker";

    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public text: string;
}

export const StickerNodeSchema = SchemaFactory.createForClass(StickerNode);
