import type { NodeBase, StickerNode as StickerNodeType } from "@lib/boards";
import type { OmitFields, Rect } from "@lib/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
class StickerNode implements OmitFields<StickerNodeType, keyof NodeBase> {
    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public text: string;
}

export const StickerNodeSchema = SchemaFactory.createForClass(StickerNode);
