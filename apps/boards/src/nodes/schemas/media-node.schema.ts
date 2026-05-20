import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { MediaNode as MediaNodeType, NodeBase } from "@repo/boards";
import type { OmitFields, Rect } from "@repo/common";

@Schema()
export class MediaNode implements OmitFields<MediaNodeType, keyof NodeBase> {
    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public url: string;
}

export const MediaNodeSchema = SchemaFactory.createForClass(MediaNode);
