import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { NodeBase, StickerNode as StickerNodeType } from "@repo/boards";
import type { OmitFields, Rect } from "@repo/common";

@Schema()
class StickerNode implements OmitFields<StickerNodeType, keyof NodeBase> {
    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public text: string;
}

export const StickerNodeSchema = SchemaFactory.createForClass(StickerNode);
