import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { MediaNode as MediaNodeType, MediaVariants } from "@repo/boards-common";
import type { Rect } from "@repo/common";
import { NodeBase } from "./node-base.schema";

@Schema()
export class MediaNode extends NodeBase implements MediaNodeType {
    @Prop({ type: String, required: true })
    public declare type: "media";

    @Prop({ type: Object, required: true })
    public rect: Rect;

    @Prop({ type: String, required: true })
    public variant: MediaVariants;

    @Prop({ type: String, required: true })
    public url: string;
}

export const MediaNodeSchema = SchemaFactory.createForClass(MediaNode);
