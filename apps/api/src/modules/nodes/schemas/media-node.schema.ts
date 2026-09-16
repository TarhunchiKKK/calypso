import type { MediaNode as MediaNodeType, NodeBase } from "@lib/boards";
import type { OmitFields, Rect } from "@lib/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
class MediaNode implements OmitFields<MediaNodeType, keyof NodeBase> {
    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public url: string;
}

export const MediaNodeSchema = SchemaFactory.createForClass(MediaNode);
